import {IReq, IRes, JWTPayload} from "../interfaces/_fomObjects";
import logger from "../config/Logging";
import {IUser, UserModel} from "../schemas/UserSchema";
import {compareHashes, saltAndHash, signJWT} from "./_authentication";
import {Types} from "mongoose";
import {_deleteDocument} from "./_deleteDocument";

/**
 * USER REGISTER: Create a document with the provided credentials
 * @param body: {
 *   name: string,
 *   nickname?: string,
 *   password: string
 * }
 */
export async function userRegister(body: IReq): Promise<IRes> {
  logger.info(`Attempting user registration`)

  let hash = saltAndHash(body.password)
  let user: IUser = new UserModel({uid: new Types.ObjectId(), name: body.name, password: hash})
  await user.save()

  logger.info(`Successfully create user ${user._id}`)

  return userLogin(body)
}

/**
 * USER LOGIN: Login a user with some identifier, and a password
 * @param body {
 *   _id?: string,
 *   id?: string,
 *   name?: string,
 *   password: string
 * }
 */
export async function userLogin(body: IReq): Promise<IRes> {
  logger.info(`Attempting user login: Credentials:`)

  let user: IUser | null = await UserModel.findOne({name: body.name})
  if (!user) throw new Error(`400: Unable to find user with credentials ${JSON.stringify(body)}`)
  if (!compareHashes(body.password, user.password)) throw new Error(`400: Invalid password`)

  logger.info(`User ${user._id} found and authenticated, attempting id renewal`)
  user.uid = new Types.ObjectId();
  await user.save()

  let token = signJWT(user)
  logger.info(`Successfully logged in ${user._id}`)

  return {
    msg: `Successfully logged in ${user._id}`,
    item: user,
    token: 'Bearer ' + token
  }
}

/**
 * USER AUTO LOGIN: Login a user with some JWT
 * @param jwt
 */
export async function userAutoLogin(jwt: JWTPayload): Promise<IRes> {
  logger.info(`Attempting user login: JWT`)
  let user: IUser | null = await UserModel.findOne({uid: jwt.uid})
  if (!user) throw new Error(`400: Unable to find user with uid ${jwt.uid}. JWT token failed`)

  logger.info(`User ${user._id} found and authenticated, attempting id renewal`)
  await user.save()
  logger.info(`Successfully logged in ${user._id}`)

  return {
    msg: `Successfully logged in ${user._id}`,
    item: user
  }
}

/**
 * USER UPDATE: Update the user
 * @param jwt
 * @param body
 */
export async function userUpdate(jwt: JWTPayload, body: IReq): Promise<IRes> {
  logger.info(`Attempting user update`)
  let user: IUser | null = await UserModel.findOne({uid: jwt.uid})
  if (!user) throw new Error(`400: Unable to find user with uid ${jwt.uid}. JWT token failed`)

  user.name = body.name ? body.name : user.name
  user.password = body.password ? saltAndHash(body.password) : user.password
  user.nickname = body.nickname ? body.nickname : user.nickname
  user.onLeave = body.onLeave ? body.onLeave : user.onLeave

  await user.save()

  logger.info(`Successfully updated user ${user._id}`)
  return {
    msg: `Successfully updated user`,
    item: user
  }
}

/**
 * USER DELETE: Remove some user from the mongoDb user collection.
 * @param jwt
 */
export async function userDelete(jwt: JWTPayload): Promise<IRes> {
  logger.info(`Attempting user delete`)
  let user: IUser | null = await UserModel.findOne({uid: jwt.uid})
  if (!user) throw new Error(`400: Unable to find user to delete.`)

  await _deleteDocument(user)
  logger.info(`Successfully deleted user ${user._id}`)

  return {
    msg: `Successfully deleted user ${user._id}`
  }
}