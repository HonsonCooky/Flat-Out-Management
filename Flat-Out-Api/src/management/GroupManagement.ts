import {Request, Response} from "express";
import {IRes} from "../interfaces/FomObjects";
import {ModelEnum} from "../interfaces/GlobalEnums";
import {IGroup} from "../schemas/GroupSchema";
import {componentRegister} from "./2.ComponentManagement";

/**
 * GROUP REGISTER: Create a new group document.
 * @param req
 * @param res
 */
export async function groupRegister(req: Request, res: Response): Promise<IRes> {
  let group: IGroup = await componentRegister(ModelEnum.GROUP, req.body) as IGroup
  await group.save()
  return {
    msg: `Successfully registered user ${group.docName}`
  }
}

/**
 * GROUP UPDATE: Update a new group document.
 * @param req
 * @param res
 */
// export async function groupUpdate(req: Request, res: Response): Promise<IRes> {
//   let user: IUser = await controllerAuth(ModelEnum.USER, res.locals.jwt) as IUser
//   let group: IGroup = await componentAuth()
//
//   await componentUpdate(ModelEnum.GROUP, req.body)
//   await group.save()
//   return {
//     msg: `Successfully registered user ${group.docName}`
//   }
// }


