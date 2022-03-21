import {Request, Response} from "express";
import {IFomRes} from "../../../Flat-Out-Interfaces/interfaces/IFomRes";
import {UserModel} from "../schemas/documents/UserSchema";
import {saltAndHash, signJWT} from "./util/AuthenticationPartials";
import {Types} from "mongoose";
import {preDocRemoval} from "./util/GenericPartials";
import {getController} from "./util/AuthorizationPartials";
import {IFomUser} from "../../../Flat-Out-Interfaces/interfaces/IFomUser";


/**
 * USER REGISTER: Create a new user document
 * @param req
 * @param res
 */
export async function userRegister(req: Request, res: Response): Promise<IFomRes> {
  let {name, password, uiName} = req.body
  let user: IFomUser = new UserModel({
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
  let user: IFomUser = await getController<IFomUser>(req)
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
  let user: IFomUser = await getController<IFomUser>(req)
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
  let user: IFomUser

  if (newName || newPassword) {
    user = await getController<IFomUser>(req)
    user.name = newName ?? user.name
    user.password = saltAndHash(newPassword) ?? user.password
  } else {
    user = await getController<IFomUser>(res)
  }

  user.uiName = uiName ?? user.uiName
  await user.save()

  return {
    msg: `Successfully updated user ${user.uiName}`,
    item: user
  }
}