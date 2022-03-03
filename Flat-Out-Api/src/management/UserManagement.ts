import {Request, Response} from "express";
import {IFomRes} from "../interfaces/IFomRes";
import {documentAuthenticate, documentDelete, documentRegister} from "./ManagementPartials";
import {ModelEnum} from "../interfaces/FomEnums";
import {IUser, UserModel} from "../schemas/documents/UserSchema";
import {Types} from "mongoose";
import {signJWT} from "./AuthPartials";
import {IFomJwtContract} from "../interfaces/IFomJwtContract";


async function userJwtAuthentication(jwt: IFomJwtContract): Promise<IUser> {
  let user: IUser | null = await UserModel.findOne({dynUuid: jwt.val}) as IUser
  if (!user) throw new Error(`400: Invalid JWT`)
  return user
}


/** ------------------------------------------------------------------------------------------------------------------
 * User Management Helpers
 ------------------------------------------------------------------------------------------------------------------*/

/**
 * USER REGISTER: Create a new user document
 * @param req
 * @param res
 */
export async function userRegister(req: Request, res: Response): Promise<IFomRes> {
  let user: IUser = await documentRegister(ModelEnum.USER, req.body) as IUser
  user.uiName = req.body.uiName ?? req.body.name
  user.dynUuid = new Types.ObjectId()
  await user.save()

  return {
    msg: `Successfully registered user ${user.name}`
  }
}

/**
 * USER AUTHENTICATE: Validate a username + password combination, and return the user object
 * @param req
 * @param res
 */
export async function userAuthenticate(req: Request, res: Response): Promise<IFomRes> {
  let user: IUser = await documentAuthenticate(ModelEnum.USER, req.body) as IUser
  user.dynUuid = new Types.ObjectId()
  await user.save()

  return {
    msg: `Successfully authenticated user ${user.name}`,
    item: user,
    token: signJWT(user.dynUuid)
  }
}

/**
 * USER DELETE: Validate a username + password combination, and then remove it from the graph of objects.
 * @param req
 * @param res
 */
export async function userDelete(req: Request, res: Response): Promise<IFomRes> {
  let user: IUser = await documentDelete(ModelEnum.USER, req.body) as IUser

  return {
    msg: `Successfully deleted user ${user.name}`
  }
}

/**
 * USER CONNECT: Connect a user to another document
 * @param req
 * @param res
 */
export async function userConnect(req: Request, res: Response): Promise<IFomRes> {


  return {
    msg: `Successfully connected user .. to .. ..`
  }
}
