import {Request, Response} from "express";
import {IFomRes} from "../interfaces/IFomRes";
import {connection, mongo, Types} from "mongoose";
import {GridFSBucket, GridFSFile} from "mongodb";
import {Readable} from "stream";
import sharp from "sharp";
import {IFomAvatarMetaData} from "../interfaces/IFomAvatarMetaData";

let bucket: GridFSBucket;

export async function initGridFs() {
  bucket = new mongo.GridFSBucket(connection.db, {
    bucketName: 'avatars'
  })

  await bucket.find().forEach((doc: GridFSFile) => {
    console.log(doc)
  })
}

/**
 * Each device can upload one photo, thus, an image name
 * @param req
 */
export function imageName(req: Request): string {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  if (!ip) throw new Error('Unable to upload photos with an address')
  return `${ip}_profile_picture`
}

export async function uploadAvatar(req: Request, res: Response): Promise<IFomRes> {
  if (!bucket) throw new Error('500: Flat Out Management cannot currently process photo uploads')
  if (!req.file?.buffer) throw new Error('400: Missing avatar from request')

  let filename = imageName(req)
  let customId = new Types.ObjectId()

  await bucket.find({filename}).forEach((doc: GridFSFile) => {
    bucket.delete(doc._id)
  })

  let writeStream = bucket.openUploadStreamWithId(customId, `${filename}`,
    {metadata: new IFomAvatarMetaData(undefined)})
  let readStream = Readable.from(
    sharp(req.file.buffer).resize({fit: sharp.fit.contain, width: 400, height: 400}))

  await new Promise((resolve, reject) => {
    readStream.pipe(writeStream).on('finish', resolve).on('error', reject)
  })

  return {
    msg: 'Successfully uploaded avatar',
    item: customId
  }
}

export async function getAvatars(req: Request, res: Response): Promise<IFomRes> {
  return {
    msg: 'Successfully retrieved avatars'
  }
}