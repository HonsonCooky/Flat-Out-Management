import {Request, Response} from "express";
import {IFomRes} from "../interfaces/IFomRes";
import {GroupModel, IGroup} from "../schemas/documents/GroupSchema";
import {saltAndHash} from "./util/BcryptPartials";
import {ModelEnum, RoleEnum} from "../interfaces/FomEnums";
import {
  connectDocuments,
  getParent,
  getParentChildAndAssociation,
  getTypeFromDoc,
  preDocRemoval
} from "./util/Partials";
import {IFomController} from "../interfaces/IFomController";
import {IFomComponent} from "../interfaces/IFomComponent";


async function groupReRender(group: IGroup) {
  let calendar = group.groupCalendar

}

/**
 * GROUP REGISTER: Create a new group document
 * @param req
 * @param res
 */
export async function groupRegister(req: Request, res: Response): Promise<IFomRes> {
  let parent: IFomController | IFomComponent = await getParent(req, res) // This is the intended parent of the table
  let {name, password} = req.body

  let group: IGroup = new GroupModel({
    uiName: name,
    password: saltAndHash(password)
  })

  await connectDocuments(
    {item: parent, model: getTypeFromDoc(parent)},
    {item: group, model: ModelEnum.GROUP},
    RoleEnum.OWNER)

  return {
    msg: `Successfully registered group ${name} with owner ${parent.uiName}`,
    item: group
  }
}

/**
 * GROUP GET: Simply get the information inside a group
 * @param req
 * @param res
 */
export async function groupGet(req: Request, res: Response): Promise<IFomRes> {
  let {parent, child, association} = await getParentChildAndAssociation(req, res)
  let {role} = association

  if (!(role === RoleEnum.OWNER || role === RoleEnum.WRITE || role === RoleEnum.READ))
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
  let {parent, child, association} = await getParentChildAndAssociation(req, res)
  let {role} = association

  if ((newName || newPassword)) {
    if (role === RoleEnum.OWNER) {
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
  let {parent, child, association} = await getParentChildAndAssociation(req, res)
  let {role} = association

  if (role != RoleEnum.OWNER) throw new Error(`400:  Invalid authorization to complete group deletion`)

  await preDocRemoval(child, ...[...child.parents, ...child.children])
  await child.deleteOne()

  return {
    msg: `${parent._id} successfully deleted group ${child.uiName}`
  }
}