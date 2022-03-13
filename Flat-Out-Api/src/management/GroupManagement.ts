import {Request, Response} from "express";
import {IFomRes} from "../interfaces/IFomRes";
import {IUser} from "../schemas/documents/UserSchema";
import {GroupModel, IGroup} from "../schemas/documents/GroupSchema";
import {saltAndHash} from "./util/AuthPartials";
import {ModelEnum, RoleEnum} from "../interfaces/FomEnums";
import {getGroup, getUser, getUserDocAndAssociation, removeDocumentFromAssociations} from "./util/Partials";


async function groupReRender(group: IGroup) {
  let calendar = group.groupCalendar

}

/**
 * GROUP REGISTER: Create a new group document
 * @param req
 * @param res
 */
export async function groupRegister(req: Request, res: Response): Promise<IFomRes> {
  let user: IUser = await getUser(res)
  let {name, password, uiName} = req.body

  let group: IGroup = new GroupModel({
    uiName: uiName ?? name,
    password: saltAndHash(password),
    parents: [{
      ref: user._id,
      model: ModelEnum.USER,
      role: RoleEnum.OWNER
    }]
  })

  user.children.push({
    ref: group._id,
    model: ModelEnum.GROUP,
    role: RoleEnum.OWNER
  })

  await user.save()
  await group.save()

  return {
    msg: `Successfully registered group ${uiName ?? name} with owner ${user.uiName}`,
    item: group
  }
}

/**
 * GROUP GET: Simply get the information inside a group
 * @param req
 * @param res
 */
export async function groupGet(req: Request, res: Response): Promise<IFomRes> {
  let {user, other, association} = await getUserDocAndAssociation<IGroup>(req, res, getGroup)

  if (!(association === RoleEnum.OWNER || association === RoleEnum.WRITE || association === RoleEnum.READ))
    throw new Error(`400: User does not have permission to read the contents of this object`)

  return {
    msg: `${user._id} successfully got ${other.uiName}`,
    item: other
  }
}

/**
 * GROUP UPDATE: Update a group document
 * @param req
 * @param res
 */
export async function groupUpdate(req: Request, res: Response): Promise<IFomRes> {
  let {newName, newPassword} = req.body
  let {user, other, association} = await getUserDocAndAssociation<IGroup>(req, res, getGroup)

  if ((newName || newPassword)) {
    if (association === RoleEnum.OWNER) {
      other.uiName = newName ?? other.uiName
      other.password = saltAndHash(newPassword) ?? other.password
    } else throw new Error(`400: Invalid authorization to complete group update`)
  }

  await other.save()

  return {
    msg: `${user._id} successfully updated ${other.uiName}`,
    item: other
  }
}

/**
 * GROUP DELETE: Remove a group document from the MongoDB gracefully
 * @param req
 * @param res
 */
export async function groupDelete(req: Request, res: Response): Promise<IFomRes> {
  let {user, other, association} = await getUserDocAndAssociation<IGroup>(req, res, getGroup)

  if (association != RoleEnum.OWNER) throw new Error(`400:  Invalid authorization to complete group deletion`)

  await removeDocumentFromAssociations(other, ...[...other.parents, ...other.children])
  await other.deleteOne()

  return {
    msg: `${user._id} successfully deleted group ${other.uiName}`
  }
}