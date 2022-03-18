import {Request, Response} from "express";
import {IFomRes} from "../interfaces/IFomRes";
import {IUser, UserModel} from "../schemas/documents/UserSchema";
import {saltAndHash} from "./util/BcryptPartials";
import {Types} from "mongoose";
import {signJWT} from "./util/SignJwt";
import {getController, preDocRemoval} from "./util/Partials";


/**
 * USER REGISTER: Create a new user document
 * @param req
 * @param res
 */
export async function userRegister(req: Request, res: Response): Promise<IFomRes> {
  let {name, password, uiName} = req.body
  let user: IUser = new UserModel({
    name,
    password: saltAndHash(password),
    uiName: uiName ?? name,
    dynUuid: new Types.ObjectId()
  })

  await user.save()

  return {
    msg: `Successfully registered user ${uiName ?? name}`
  }
}

/**
 * USER GET: Get a user, with Username and Password
 * @param req
 * @param res
 */
export async function userGet(req: Request, res: Response): Promise<IFomRes> {
  let user: IUser = await getController(req) as IUser
  user.dynUuid = new Types.ObjectId()
  await user.save()
  let token: string = signJWT(user, req.body.expiresIn)

  return {
    msg: `Successfully logged in user ${user.uiName}`,
    item: user,
    token
  }
}

/**
 * USER DELETE: Delete a user from the document db
 * @param req
 * @param res
 */
export async function userDelete(req: Request, res: Response): Promise<IFomRes> {
  let user: IUser = await getController(req) as IUser
  await preDocRemoval(user, user.children)
  await user.deleteOne()

  return {
    msg: `Successfully deleted user ${user.uiName}`,
    item: user
  }
}

/**
 * USER UPDATE: Update a user document
 * @param req
 * @param res
 */
export async function userUpdate(req: Request, res: Response): Promise<IFomRes> {
  let {newName, newPassword, uiName} = req.body
  let user: IUser

  if (newName || newPassword) {
    user = await getController(req) as IUser
    user.name = newName ?? user.name
    user.password = saltAndHash(newPassword) ?? user.password
  } else {
    user = await getController(res) as IUser
  }

  user.uiName = uiName ?? user.uiName
  await user.save()

  return {
    msg: `Successfully updated user ${user.uiName}`,
    item: user
  }
}