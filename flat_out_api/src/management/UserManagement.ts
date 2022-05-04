import {Request, Response} from "express";
import {UserModel} from "../schemas/documents/UserSchema";
import {saltAndHash, signJWT} from "./util/AuthenticationPartials";
import {Types} from "mongoose";
import {authLevel, preDocRemoval} from "./util/GenericPartials";
import {getController} from "./util/AuthorizationPartials";
import {groupCalendar} from "./util/GroupCalendar";
import {IFomRes} from "../interfaces/IFomRes";
import {IFomUser} from "../interfaces/IFomUser";
import {IFomAssociation} from "../interfaces/IFomAssociation";
import {ModelType, RoleType} from "../interfaces/IFomEnums";
import {IFomGroup} from "../interfaces/IFomGroup";


/**
 * Create a new user document
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
  let token: string = signJWT(user, req.body.expiresIn)

  await user.save()

  return {
    msg: `Successfully registered user ${uiName ?? name}`,
    item: user,
    token
  }
}

/**
 * Get a user, with Username and Password
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
 * Delete a user from the document db
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

export async function userSearch(req: Request, res: Response): Promise<IFomRes> {
  let searchStr: string | null = req.query?.u as string
  if (!searchStr) throw new Error('400: Missing search string')

  let reg: RegExp = RegExp(`.*${searchStr}.*`, "i")

  let userList: IFomUser[] = await UserModel.find({
    $or: [
      {name: {$regex: reg}},
      {uiName: {$regex: reg}},
    ]
  }).select([ "_id", "name", "uiName", "colorAssociation"])

  // Broaden search (basic)
  if (userList.length === 0 && !searchStr.includes('.*')) {
    req.query.u = `.*${searchStr.split('').join('.*')}.*`
    return userSearch(req, res)
  }

  return {
    msg: `Successfully found ${userList.length} result(s)`,
    item: userList
  }
}

/**
 * Update a user document
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
 * When the user updates an outOfFlatDates, then the group their associated with need to know that as well.
 * @param user
 */
async function dateUpdate(user: IFomUser) {
  (await user.populate({path: 'children.ref'}))
    .children
    .filter((a: IFomAssociation) => a.model === ModelType.GROUP && authLevel(a.role) < authLevel(RoleType.READER))
    .map((a: any) => a.ref as IFomGroup)
    .forEach((g: IFomGroup) => groupCalendar(g))
}

