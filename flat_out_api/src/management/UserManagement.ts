import {Request, Response} from "express";
import {UserModel} from "../schemas/documents/UserSchema";
import {saltAndHash, signJWT} from "./util/AuthenticationPartials";
import {Types} from "mongoose";
import {preDocRemoval} from "./util/GenericPartials";
import {getController} from "./util/AuthorizationPartials";
import {groupCalendar} from "./util/GroupCalendar";
import {IFomRes} from "../interfaces/IFomRes";
import {IFomUser} from "../interfaces/IFomUser";
import {IFomAssociation} from "../interfaces/IFomAssociation";
import {ModelType} from "../interfaces/IFomEnums";
import {IFomGroup} from "../interfaces/IFomGroup";


/**
 * USER REGISTER: Create a new user document
 * @param req
 * @param res
 */
export async function userRegister(req: Request, res: Response): Promise<IFomRes> {
  let {name, password, uiName} = req.body
  let randColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');

  let user: IFomUser = new UserModel({
    name,
    password: saltAndHash(password),
    uiName: uiName ?? name,
    colorAssociation: randColor,
    dynUuid: new Types.ObjectId()
  })

  await user.save()

  return {
    msg: `Successfully registered user ${uiName ?? name}`,
    item: user
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
  let {newName, newPassword, uiName, uiColor, outOfFlatDates, outOfFlatDate} = req.body
  let user: IFomUser

  if (newName || newPassword) {
    user = await getController<IFomUser>(req)
    user.name = newName ?? user.name
    user.password = saltAndHash(newPassword) ?? user.password
  } else {
    user = await getController<IFomUser>(res)
  }

  user.uiName = uiName ?? user.uiName
  user.colorAssociation = uiColor ?? user.colorAssociation

  if (outOfFlatDates || outOfFlatDate) {
    if (outOfFlatDates) user.outOfFlatDates = outOfFlatDates
    else user.outOfFlatDates.push(outOfFlatDate)
    await dateUpdate(user)
  }

  await user.save()

  return {
    msg: `Successfully updated user ${user.uiName}`,
    item: user
  }
}

/**
 *
 * @param user
 */
async function dateUpdate(user: IFomUser) {
  (await user.populate({path: 'children.ref'}))
    .children
    .filter((a: IFomAssociation) => a.model === ModelType.GROUP)
    .map((a: any) => a.ref as IFomGroup)
    .forEach((g: IFomGroup) => groupCalendar(g))
}

