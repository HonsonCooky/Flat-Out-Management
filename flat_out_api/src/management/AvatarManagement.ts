import {Request, Response} from "express";
import {IFomRes} from "../interfaces/IFomRes";
import {connection, mongo, Types} from "mongoose";
import {GridFSBucket, GridFSBucketReadStream, GridFSFile} from "mongodb";
import {Readable} from "stream";
import sharp from "sharp";
import {IFomAvatarMetaData, IFomMetaDataOptions} from "../interfaces/IFomAvatarMetaData";
import {getController, getControllerAndComponentQuery, getRegisteringParent} from "./util/AuthorizationPartials";
import {IFomUser} from "../interfaces/IFomUser";

import {IFomDbObject} from "../interfaces/IFomDbObject";
import {authLevel} from "./util/GenericPartials";
import {RoleType} from "../interfaces/IFomEnums";

const bucketName = 'avatars'
let bucket: GridFSBucket;

/**
 * Initialize the GridFSBucket (which can only be done when a connection to MongoDB has been established)
 */
export async function initGridFs() {
  bucket = new mongo.GridFSBucket(connection.db, {bucketName})
  await cleanAvatars()
}

function getIp(req: Request): string {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  return `${ip}`
}

function toImageName(name: string) {
  return `${name}_avatar`
}

/**
 * Upload an avatar image, attempting to associate a user to this call.
 * @param req
 * @param res
 */
export async function uploadAvatar(req: Request, res: Response): Promise<IFomRes> {
  let customId = new Types.ObjectId()

  if ("association" in req.query) { // Given a component to associate some picture to
    let {component, role} = await getControllerAndComponentQuery(req, res)
    if (authLevel(role) > authLevel(RoleType.WRITER)) throw new Error('400: Invalid authorization')
    await streamUpload(req, customId, component)
  } else if (res.locals.jwt) { // Given an authenticated user
    let user: IFomUser = await getController<IFomUser>(res)
    await streamUpload(req, customId, user)
  } else { // Given nothing
    await streamUpload(req, customId)
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
 * @param fomDbObject
 */
async function streamUpload(req: Request, id: Types.ObjectId, fomDbObject?: IFomDbObject) {
  if (!bucket) throw new Error('500: Flat Out Management cannot currently process photo uploads')
  if (!req.file?.buffer) throw new Error('400: Missing avatar from request')


  // Remove previous uploads
  if (fomDbObject) await cleanAvatars({id: fomDbObject._id})
  await cleanAvatars({ip: getIp(req)})

  // Calculate delete time (now + 2h)
  let validUntil = new Date()
  validUntil.setHours(validUntil.getHours() + 2)

  // Create a read and write stream, to upload date to GridFS
  let writeStream = bucket.openUploadStreamWithId(id,
    // Image name based on ID or IP
    fomDbObject ? toImageName(fomDbObject._id.toString()) : toImageName(getIp(req)),
    {
      metadata: new IFomAvatarMetaData({
        association: fomDbObject ? fomDbObject._id : undefined,
        validUntil // Always included (in case future updates allow dis-association)
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
export async function downloadAvatar(req: Request, res: Response) {
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
 * @param req
 * @param fomDbObject
 * @param aId
 */
export async function linkAvatar(req: Request, fomDbObject: IFomDbObject, aId: string) {
  let avatarCollection = connection.db.collection<GridFSFile>(`${bucketName}.files`)

  let avatarId = new Types.ObjectId(aId)
  let file: GridFSFile | null = await avatarCollection.findOne({_id: avatarId})

  if (!file) throw new Error('400: Unable to find uploaded avatar')
  if (file.metadata?.association) throw new Error(`400: Attempted second link to avatar ${avatarId}`);

  let validUntil = new Date()
  validUntil.setHours(validUntil.getHours() + 2)

  await cleanAvatars({id: fomDbObject._id})

  await avatarCollection.updateOne({_id: file._id},
    {
      $set: {
        metadata: new IFomAvatarMetaData({association: fomDbObject._id, validUntil}),
        filename: toImageName(fomDbObject._id.toString())
      }
    })

  await cleanAvatars({ip: getIp(req)})

  fomDbObject.avatar = avatarId
}

/**
 * A wrapper for 'cleanAvatars', which determines the
 * @param req
 * @param res
 */
export async function deleteAvatar(req: Request, res: Response): Promise<IFomRes> {
  let doc: IFomDbObject = await getRegisteringParent(req, res)
  if (!doc.avatar) throw new Error(`400: Document doesn't have an avatar to delete`)

  await cleanAvatars({id: doc._id})
  doc.avatar = undefined
  await doc.save()

  return {
    msg: `Successfully removed avatar`
  }
}

/**
 * Clean the avatars in the MongoDB.
 * When some entity can be associated to the upload, remove their previous uploads.
 * IP deletes occur because the same user has clearly changed their mind. If a new user is created from the same IP,
 * then the previous images has already been associated with a user, and thus, has a new name.
 */
export async function cleanAvatars(options?: { id?: Types.ObjectId, ip?: string }) {
  try {
    // Remove avatars that are not associated to another document, and have expired
    if (options?.id) await bucket.find({'metadata.association': options.id}).forEach((doc: GridFSFile) => {
      bucket.delete(doc._id)
    })
    // Remove avatars based on IP (file name for unclaimed images)
    if (options?.ip) await bucket.find({filename: toImageName(options.ip)}).forEach((doc: GridFSFile) => {
      bucket.delete(doc._id)
    })
    // Remove avatars associated to this id (each document only gets ONE profile picture).
    if (!options) await bucket.find().forEach((doc: GridFSFile) => {
      if (IFomAvatarMetaData.shouldDelete(doc.metadata as unknown as IFomMetaDataOptions)) bucket.delete(doc._id)
    })
  } catch (e) {
  }
}