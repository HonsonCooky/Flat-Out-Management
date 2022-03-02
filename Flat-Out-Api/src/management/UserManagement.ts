import {IRes} from "../interfaces/FomObjects";
import {IUser} from "../schemas/UserSchema";
import {
  controllerAuth,
  controllerConnect,
  controllerDelete,
  controllerJwtGet,
  controllerPopulate,
  controllerRegister,
  controllerUpdate
} from "./3.ControllerManagement";
import {ModelEnum} from "../interfaces/GlobalEnums";
import {Request, Response} from "express";
import {signJWT} from "./0.AuthFuncs";

/**
 * USER REGISTER: Create a USER document.
 * @param req
 * @param res
 */
export async function userRegister(req: Request, res: Response): Promise<IRes> {
  let user: IUser = await controllerRegister(ModelEnum.USER, req.body) as IUser
  await user.save()
  return {
    msg: `Successfully registered user ${user.docName}`
  }
}

/**
 * USER DELETE: Delete a user document.
 * @param req
 * @param res
 */
export async function userDelete(req: Request, res: Response): Promise<IRes> {
  let user: IUser = await controllerAuth(ModelEnum.USER, req.body) as IUser
  await controllerDelete(user)

  return {
    msg: `Successfully deleted user ${user.docName}`
  }
}

/**
 * USER AUTH: Authenticate a user document.
 * @param req
 * @param res
 */
export async function userAuth(req: Request, res: Response): Promise<IRes> {
  let user: IUser = await controllerAuth(ModelEnum.USER, req.body) as IUser
  let token: string = signJWT(user.uuid, req.body.expiresIn)

  return {
    msg: `Successfully authenticated user ${user.docName}`,
    item: user,
    token
  }
}

/**
 * USER UPDATE: Update the contents of a user. Only need to inform a group of the update, if OutOfFlatDates is altered.
 * @param req
 * @param res
 */
export async function userUpdate(req: Request, res: Response): Promise<IRes> {
  let user: IUser = await controllerJwtGet(ModelEnum.USER, res.locals.jwt) as IUser
  await controllerUpdate(ModelEnum.USER, user, req.body, !!req.body.outOfFlatDates)
  await user.save()

  return {
    msg: `Successfully updated user ${user.docName}`,
    item: user
  }
}

/**
 * USER CONNECT: Connect a user to some document
 * @param req
 * @param res
 */
export async function userConnect(req: Request, res: Response): Promise<IRes> {
  await controllerConnect(ModelEnum.USER, req, res)

  return {
    msg: `Successfully connected user to document`
  }
}

/**
 * USER POPULATE: This EXPENSIVE function will return all the information from the server, that a client will need.
 * @param req
 * @param res
 */
export async function userGet(req: Request, res: Response): Promise<IRes> {
  let user: IUser = await controllerAuth(ModelEnum.USER, res.locals.jwt) as IUser
  await controllerPopulate(ModelEnum.USER, user)

  return {
    msg: `Successfully populated user`,
    item: user
  }
}
