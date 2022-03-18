import {Request, Response} from "express";
import {IFomRes} from "../../interfaces/IFomRes";
import {getParentChildAndAssociation, preDocRemoval, roleScore} from "./Partials";
import {ModelEnum, RoleEnum} from "../../interfaces/FomEnums";

/**
 * GROUP GET: Simply get the information inside a group
 * @param req
 * @param res
 */
export async function componentGet(req: Request, res: Response): Promise<IFomRes> {
  let {parent, child, association} = await getParentChildAndAssociation(req, res)
  let {role} = association

  if (roleScore(role) > roleScore(RoleEnum.READ))
    throw new Error(`400: User does not have permission to read the contents of this object`)

  return {
    msg: `${parent._id} successfully got ${child.uiName}`,
    item: child
  }
}

/**
 * GROUP DELETE: Remove a group document from the MongoDB gracefully
 * @param req
 * @param res
 */
export async function componentDelete(req: Request, res: Response): Promise<IFomRes> {
  let {parent, child, association} = await getParentChildAndAssociation(req, res)
  let {role} = association

  let type: ModelEnum = <ModelEnum>req.params.component
  if (role != RoleEnum.OWNER) throw new Error(`400:  Invalid authorization to complete ${type} deletion`)

  await preDocRemoval(child, child.children, child.parents)
  await child.deleteOne()

  return {
    msg: `${parent._id} successfully deleted ${type} ${child.uiName}`
  }
}