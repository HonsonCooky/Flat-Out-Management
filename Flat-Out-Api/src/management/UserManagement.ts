import {IRes} from "../interfaces/FomObjects";
import {IUser} from "../schemas/UserSchema";
import {controllerAuth, controllerRegister} from "./ControllerManagementHelpers";
import {ModelEnum} from "../interfaces/GlobalEnums";
import {Request, Response} from "express";
import {signJWT} from "./AuthFuncs";


export async function userRegister(req: Request, res: Response): Promise<IRes> {
  let user: IUser = await controllerRegister(ModelEnum.USER, req.body) as IUser
  await user.save()
  return {
    msg: `Successfully registered user ${user.docName}`
  }
}

export async function userAuth(req: Request, res: Response): Promise<IRes> {
  let user: IUser = await controllerAuth(ModelEnum.USER, res.locals.jwt ?? req.body) as IUser
  let token: string | undefined = !res.locals.jwt ? 'Bearer ' + signJWT(user, req.body.expiresIn) : undefined

  return {
    msg: `Successfully authenticated user ${user.docName}`,
    item: user,
    token
  }
}