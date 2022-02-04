import {IReq, IRes} from "../interfaces/_fomObjects";
import logger from "../config/Logging";
import {IUser, UserModel} from "../schemas/UserSchema";
import {saltAndHash, signJWT} from "./_authentication";

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

  const hash = saltAndHash(body.password)
  const user: IUser = new UserModel({name: body.name, password: hash})
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
  logger.info(`Attempting user login`)

  const user: IUser | null = await UserModel
    .findOne({name: body.name})
    .select("-password")

  if (!user) throw new Error(`400: Unable to find user with credentials ${body}`)

  const token = signJWT(user)

  logger.info(`Successful user login ${user._id}`)
  return {
    msg: `Successfully logged in ${user._id}`,
    item: user,
    token
  }
}

/**
 * USER UPDATE
 * @param id
 * @param body
 */
export async function userUpdate(id: string, body: IReq): Promise<IRes> {

  return {
    msg: `Successfully updated user`
  }
}