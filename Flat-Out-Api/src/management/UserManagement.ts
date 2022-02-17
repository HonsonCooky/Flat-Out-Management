import {IFomObject, IRes} from "../interfaces/FomObjects";
import {IUser} from "../schemas/UserSchema";
import {controllerAuth, controllerDelete, controllerRegister, controllerUpdate} from "./3.ControllerManagement";
import {ModelEnum} from "../interfaces/GlobalEnums";
import {Request, Response} from "express";
import {signJWT} from "./0.AuthFuncs";
import {models} from "mongoose";

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
  let user: IUser = await controllerAuth(ModelEnum.USER, res.locals.jwt ?? req.body) as IUser
  let token: string | undefined = !res.locals.jwt ? 'Bearer ' + signJWT(user, req.body.expiresIn) : undefined

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
  controllerUpdate(user, req.body)
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
  if (!req.params.type)
    throw new Error(`400: Unable to connect to document without model`)

  let type = req.params.type
  if (!Object.values(ModelEnum).includes(<ModelEnum>type.toLowerCase()))
    throw new Error(`400: Unable to find model ${type}`)

  let user: IUser = await controllerAuth(ModelEnum.USER, res.locals.jwt) as IUser

  let doc: IFomObject | null = await models[type].findOne({_id: req.body.doc})


  return {
    msg: `Successfully connected user ${user.docName} to `
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