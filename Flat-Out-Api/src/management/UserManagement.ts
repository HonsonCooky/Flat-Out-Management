import {IRes} from "../interfaces/FomObjects";
import {IUser} from "../schemas/UserSchema";
import {
  controllerAuth,
  controllerConnect,
  controllerDelete,
  controllerPopulate,
  controllerRegister,
  controllerUpdate
} from "./3.ControllerManagement";
import {ModelEnum, RoleEnum} from "../interfaces/GlobalEnums";
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
 * USER UPDATE: Update the contents of a user.
 * @param req
 * @param res
 */
export async function userUpdate(req: Request, res: Response): Promise<IRes> {
  let user: IUser = await controllerAuth(ModelEnum.USER, res.locals.jwt) as IUser
  await controllerUpdate(user, req.body)
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
  let token = req.body.authLevel != RoleEnum.JOIN_REQUEST ? signJWT(req.body.password) : undefined

  return {
    msg: `Successfully connected user to document`,
    token
  }
}

/**
 * USER POPULATE: This EXPENSIVE function will return all the information from the server, that a client will need.
 * @param req
 * @param res
 */
export async function userPopulate(req: Request, res: Response): Promise<IRes> {
  let user: IUser = await controllerAuth(ModelEnum.USER, res.locals.jwt) as IUser
  await controllerPopulate(user)

  return {
    msg: `Successfully populated user`,
    item: user
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