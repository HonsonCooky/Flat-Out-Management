import {Request, Response} from "express";
import {IFomRes} from "../interfaces/IFomRes";
import {IUser} from "../schemas/documents/UserSchema";
import {GroupModel, IGroup} from "../schemas/documents/GroupSchema";
import {saltAndHash} from "./util/AuthPartials";
import {ModelEnum, RoleEnum} from "../interfaces/FomEnums";
import {connectDocuments, getController, getParentChildAndAssociation, preDocRemoval} from "./util/Partials";


async function groupReRender(group: IGroup) {
  let calendar = group.groupCalendar

}

/**
 * GROUP REGISTER: Create a new group document
 * @param req
 * @param res
 */
export async function groupRegister(req: Request, res: Response): Promise<IFomRes> {
  let user: IUser = await getController<IUser>(res)
  let {name, password} = req.body

  let group: IGroup = new GroupModel({
    uiName: name,
    password: saltAndHash(password)
  })

  await connectDocuments({item: user, model: ModelEnum.USER},
    {item: group, model: ModelEnum.GROUP},
    RoleEnum.OWNER)

  return {
    msg: `Successfully registered group ${name} with owner ${user.uiName}`,
    item: group
  }
}

/**
 * GROUP GET: Simply get the information inside a group
 * @param req
 * @param res
 */
export async function groupGet(req: Request, res: Response): Promise<IFomRes> {
  let {parent, child, association} = await getParentChildAndAssociation<IGroup>(req, res)

  if (!(association === RoleEnum.OWNER || association === RoleEnum.WRITE || association === RoleEnum.READ))
    throw new Error(`400: User does not have permission to read the contents of this object`)

  return {
    msg: `${parent._id} successfully got ${child.uiName}`,
    item: child
  }
}

/**
 * GROUP UPDATE: Update a group document
 * @param req
 * @param res
 */
export async function groupUpdate(req: Request, res: Response): Promise<IFomRes> {
  let {newName, newPassword} = req.body
  let {parent, child, association} = await getParentChildAndAssociation<IGroup>(req, res)

  if ((newName || newPassword)) {
    if (association === RoleEnum.OWNER) {
      child.uiName = newName ?? child.uiName
      child.password = saltAndHash(newPassword) ?? child.password
    } else throw new Error(`400: Invalid authorization to complete group update`)
  }

  await child.save()

  return {
    msg: `${parent._id} successfully updated ${child.uiName}`,
    item: child
  }
}

/**
 * GROUP DELETE: Remove a group document from the MongoDB gracefully
 * @param req
 * @param res
 */
export async function groupDelete(req: Request, res: Response): Promise<IFomRes> {
  let {parent, child, association} = await getParentChildAndAssociation<IGroup>(req, res)

  if (association != RoleEnum.OWNER) throw new Error(`400:  Invalid authorization to complete group deletion`)

  await preDocRemoval(child, ...[...child.parents, ...child.children])
  await child.deleteOne()

  return {
    msg: `${parent._id} successfully deleted group ${child.uiName}`
  }
}