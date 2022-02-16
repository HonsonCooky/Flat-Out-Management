import {IRes} from "../interfaces/FomObjects";
import {IUser} from "../schemas/UserSchema";
import {controllerAuth, controllerDelete, controllerRegister, controllerUpdate} from "./ControllerManagementHelpers";
import {ModelEnum} from "../interfaces/GlobalEnums";
import {Request, Response} from "express";
import {signJWT} from "./AuthFuncs";

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
    msg: `Successfully updated ${user.docName}`,
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
    msg: `Successfully deleted ${user.docName}`
  }
}