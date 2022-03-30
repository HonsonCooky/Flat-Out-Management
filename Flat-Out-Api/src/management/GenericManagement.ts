import {Request, Response} from "express";
import {authLevel, preDocRemoval} from "./util/GenericPartials";
import {getUserChildAndRole} from "./util/AuthorizationPartials";
import {ModelType, RoleType, IFomRes} from "flat-out-interfaces";

/**
 * GROUP GET: Simply get the information inside a group
 * @param req
 * @param res
 */
export async function componentGet(req: Request, res: Response): Promise<IFomRes> {
  let {user, child, role} = await getUserChildAndRole(req, res)


  let type: ModelType = <ModelType>req.params.component
  if (authLevel(role) > authLevel(RoleType.READ))
    throw new Error(`400: Invalid authorization to get ${type}`)

  return {
    msg: `${user._id} successfully got ${type} ${child.uiName}`,
    item: child
  }
}

/**
 * GROUP DELETE: Remove a group document from the MongoDB gracefully
 * @param req
 * @param res
 */
export async function componentDelete(req: Request, res: Response): Promise<IFomRes> {
  let {user, child, role} = await getUserChildAndRole(req, res)

  let type: ModelType = <ModelType>req.params.component
  if (role != RoleType.OWNER) throw new Error(`400: Invalid authorization to complete ${type} deletion`)

  await preDocRemoval(child, child.children, child.parents)
  await child.deleteOne()

  return {
    msg: `${user._id} successfully deleted ${type} ${child.uiName}`
  }
}