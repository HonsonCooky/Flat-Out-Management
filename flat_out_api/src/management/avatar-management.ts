import {connection, mongo, Types} from "mongoose";
import {GridFSFile} from "mongodb"
import {AvatarMetaDataImpl} from "../interfaces/utils/avatar-meta-data";
import {Request} from "express";

const bucketName = 'avatars'
const bucket = new mongo.GridFSBucket(connection.db, {bucketName});

/**
 * Initialize the GridFSBucket (which can only be done when a connection to MongoDB has been established)
 */
export async function initGridFs() {

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
      if (AvatarMetaDataImpl.from(doc.metadata).shouldDelete()) bucket.delete(doc._id)
    })
  } catch (e) {
  }
}