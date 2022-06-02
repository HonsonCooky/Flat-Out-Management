import {connection, mongo, Types} from "mongoose";
import {Request, Response} from "express";
import {CONFIG} from "../config";
import {FomRes} from "../interfaces/utils/fom-res";
import {getJwtEntity} from "./utils/authorization/authorization";
import {DbEntity} from "../interfaces/entities/db-entity";
import {Readable} from "stream";
import sharp from "sharp";
import {RoleType, roleVal} from "../interfaces/association";
import {getAssociation} from "./utils/authorization/get-association";

const bucketName = 'avatars'
const bucket = new mongo.GridFSBucket(connection.db, {bucketName});
CONFIG.mongoDb.isGridConnected = !!bucket

/**
 * A means for creating a consistent naming convention across all files. This makes finding some file for an entity
 * a lot easier, as it is either listed as this name, or it doesn't exist.
 * @param entity
 */
function getImageName(entity: DbEntity) {
  return `${entity._id}_avatar`
}


/**
 * Delete an entity's avatar from the database.
 */
async function deleteAvatarForEntity(forEntity: DbEntity) {
  try {
    let avatarMatches = await bucket.find({filename: getImageName(forEntity)}).toArray()
    for (let avatar of avatarMatches) await bucket.delete(avatar._id)
  } catch (e) {
    console.log(`Unable to remove documents for ${forEntity._id}\n${e}`)
  }
}


/**
 * Uploads an image into the backend on behalf of some entity. This is like any other request that requires an JWT
 * to locate the entity making the request. The entire process is wrapped into this one method, so connecting and
 * managing avatars is unnecessary.
 * @param req
 * @param res
 */
export async function uploadAvatar(req: Request, res: Response): Promise<FomRes> {
  if (!req.file?.buffer) throw new Error('400: Missing avatar from request')
  let {entity} = await getJwtEntity(res)
  let customId = new Types.ObjectId()

  // Remove previous association
  await deleteAvatarForEntity(entity)

  // Create write stream to upload avatar image to GridFS
  let writeStream = bucket.openUploadStreamWithId(
    customId,
    getImageName(entity),
  )

  // Create read stream, to resize and upload the avatar image read into memory from Multer.
  let readStream = Readable.from(sharp(req.file.buffer).resize({
      fit: sharp.fit.contain,
      width: 400,
      height: 400
    }).png()
  )

  // Combine the two streams. Reading information from multer, to GridFS
  await new Promise((resolve, reject) => {
    readStream.pipe(writeStream).on('finish', resolve).on('error', reject)
  })

  // Link to the entity
  entity.ui.avatar = customId
  await entity.save()

  return {
    msg: `Avatar uploaded for ${entity.ui.name}`
  }
}


/**
 * A wrapper for 'deleteAvatarForEntity', which removes all avatars for this entity.
 * @param req
 * @param res
 */
export async function deleteAvatar(req: Request, res: Response): Promise<FomRes> {
  let {entity} = await getJwtEntity(res)
  if (!entity.ui.avatar) throw new Error(`400: Document doesn't have an avatar to delete`)

  await deleteAvatarForEntity(entity)
  entity.ui.avatar = undefined
  await entity.save()
  return {
    msg: `Deleted avatar for `
  }
}

/**
 * Retrieve an avatar from the database, and stream it back to the client. Only documents that are connected to the
 * user (IN ANY WAY) can be retrieved from the database.
 * @param req
 * @param res
 */
export async function downloadAvatar(req: Request, res: Response) {
  let avatarId = req.params.avatarId
  if (!avatarId) throw new Error(`400: Unspecified avatar in request`)

  let {entity} = await getJwtEntity(res, RoleType.READER)
  let {role} = await getAssociation(entity, new Types.ObjectId(avatarId))
  if (roleVal(role) > roleVal(RoleType.READER)) throw new Error('400: Invalid authorization to download avatar')

  try {
    let stream = bucket.openDownloadStream(new Types.ObjectId(avatarId))
    res.contentType('image/png')
    stream.pipe(res)
  } catch (e) {
    throw new Error(`400: Unable to find avatar ${req.params.avatarId}`)
  }
}
