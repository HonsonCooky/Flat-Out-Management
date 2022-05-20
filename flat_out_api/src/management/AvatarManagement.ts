import {Request, Response} from "express";
import {IFomRes} from "../interfaces/IFomRes";
import {connection, mongo, Types} from "mongoose";
import {GridFSBucket, GridFSBucketReadStream, GridFSFile} from "mongodb";
import {Readable} from "stream";
import sharp from "sharp";
import {IFomAvatarMetaData} from "../interfaces/IFomAvatarMetaData";
import {getController} from "./util/AuthorizationPartials";
import {IFomUser} from "../interfaces/IFomUser";
import {fomLogger} from "../config/Logger";
import {IFomDbObject} from "../interfaces/IFomDbObject";

const bucketName = 'avatars'
let bucket: GridFSBucket;

/**
 * Initialize the GridFSBucket (which can only be done when a connection to MongoDB has been established)
 */
export async function initGridFs() {
  try {
    bucket = new mongo.GridFSBucket(connection.db, {bucketName})
    fomLogger.info('GridFs Initialized')
    await cleanAvatars()
  } catch (e) {
    fomLogger.error(`${e}`)
  }
}

/**
 * Each device can upload one photo, thus, an image name
 * @param req
 */
export function imageName(req: Request): string {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  if (!ip) throw new Error('Unable to upload photos without an address')
  return `${ip}_profile_picture`
}

/**
 * Upload an avatar image, attempting to associate a user to this call.
 * @param req
 * @param res
 */
export async function uploadAvatar(req: Request, res: Response): Promise<IFomRes> {
  let customId = new Types.ObjectId()

  try {
    let user: IFomUser = await getController<IFomUser>(res)
    await upload(req, customId, user._id)
  } catch (e) {
    await upload(req, customId)
  }

  return {
    msg: 'Successfully uploaded avatar',
    item: customId
  }
}

/**
 * Upload an avatar to the GridFS storage.
 * @param req
 * @param id
 * @param association
 */
async function upload(req: Request, id: Types.ObjectId, association?: Types.ObjectId) {
  if (!bucket) throw new Error('500: Flat Out Management cannot currently process photo uploads')
  if (!req.file?.buffer) throw new Error('400: Missing avatar from request')
  await cleanAvatars()

  // Get static file name (based on IP address)
  let filename = imageName(req)

  // Delete all files related to this IP address
  await bucket.find({filename}).forEach((doc: GridFSFile) => {
    bucket.delete(doc._id)
  })

  // Calculate delete time (now + 2h)
  let validUntil = new Date()
  validUntil.setHours(validUntil.getHours() + 2)

  // Create a read and write stream, to upload date to GridFS
  let writeStream = bucket.openUploadStreamWithId(id, `${filename}`, {
    metadata: new IFomAvatarMetaData({
      association,
      validUntil
    })
  })

  let readStream = Readable.from(
    sharp(req.file.buffer).resize({fit: sharp.fit.contain, width: 400, height: 400}).png())

  await new Promise((resolve, reject) => {
    readStream.pipe(writeStream).on('finish', resolve).on('error', reject)
  })
}

/**
 * Retrieve an avatar from the database
 * @param req
 * @param res
 */
export async function getAvatar(req: Request, res: Response) {
  try {
    res.contentType('image/png')
    let stream: GridFSBucketReadStream = bucket.openDownloadStream(new Types.ObjectId(req.params.avatarId))
    stream.pipe(res)
  } catch (e) {
    throw new Error('400: Unable to find avatar')
  }
}

/**
 * Avatars are uploaded separately to documents. Avatars will be uploaded first, and then documents will be
 * registered/updated after a successful upload. As such
 * @param fomDbObject
 * @param aId
 */
export async function linkAvatar(fomDbObject: IFomDbObject, aId: string) {
  try {
    let avatarCollection = connection.db.collection<GridFSFile>(`${bucketName}.files`)
    let avatarId = new Types.ObjectId(aId)
    let file: GridFSFile | null = await avatarCollection.findOne({_id: avatarId})

    if (!file) throw new Error('400: Unable to find uploaded avatar')
    if (file.metadata?.association) throw new Error(`400: Attempted second link to avatar ${avatarId}`);

    let validUntil = new Date()
    validUntil.setHours(validUntil.getHours() + 2)

    await avatarCollection.updateOne({_id: file._id},
      {$set: {metadata: new IFomAvatarMetaData({association: fomDbObject._id, validUntil})}})

    fomDbObject.avatar = avatarId
  } catch (e) {
    throw new Error('400: Unable to find uploaded avatar')
  }
}

/**
 * Clean through the avatars. Each avatar has a two-hour time period to be associated to some document. Once this time
 * period expires, then the document is thought to be stale, and removed from the DB.
 */
async function cleanAvatars() {
  try {
    await bucket.find().forEach((doc: GridFSFile) => {
      if (!doc.metadata) bucket.delete(doc._id)
      else if (new IFomAvatarMetaData(doc.metadata as any).shouldDelete()) bucket.delete(doc._id)
    })
  } catch (e) {
    fomLogger.error(`${e}`)
  }
}