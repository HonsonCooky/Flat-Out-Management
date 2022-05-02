import {Request, Response} from "express";
import {GroupModel} from "../schemas/documents/GroupSchema";
import {compareHashes, saltAndHash} from "./util/AuthenticationPartials";
import {authLevel, connectDocuments, getTypeFromDoc} from "./util/GenericPartials";
import {getRegisteringParent, getUserAndChild, getUserChildAndRole} from "./util/AuthorizationPartials";
import {groupCalendar} from "./util/GroupCalendar";
import {IFomGroup} from "../interfaces/IFomGroup";
import {IFomRes} from "../interfaces/IFomRes";
import {IFomController} from "../interfaces/IFomController";
import {IFomComponent} from "../interfaces/IFomComponent";
import {ModelType, RoleType} from "../interfaces/IFomEnums";

export async function groupRenew(group: IFomGroup) {
  let copy: IFomGroup = JSON.parse(JSON.stringify(group));
  await groupCalendar(copy)
  group.groupCalendar = copy.groupCalendar;
  await group.save()
}

/**
 * GROUP REGISTER: Create a new group document
 * @param req
 * @param res
 */
export async function groupRegister(req: Request, res: Response): Promise<IFomRes> {
  let parent: IFomController | IFomComponent = await getRegisteringParent(req, res)
  let {name, password} = req.body

  let group: IFomGroup = new GroupModel({
    uiName: name,
    password: saltAndHash(password)
  })

  await group.save()

  await connectDocuments(
    {item: parent, model: getTypeFromDoc(parent)},
    {item: group, model: ModelType.GROUP},
    RoleType.OWNER)

  return {
    msg: `Successfully registered group ${name} with owner ${parent.uiName}`,
    item: group
  }
}

/**
 * GROUP JOIN: Join a pre-existing group document
 * @param req
 * @param res
 */
export async function groupJoin(req: Request, res: Response): Promise<IFomRes> {
  let {user, child} = await getUserAndChild<IFomGroup>(req, res)
  let {name, password, role} = req.body

  if (!compareHashes(password, child.password)) throw new Error('400: Invalid group authorization')

  await connectDocuments(
    {item: user, model: getTypeFromDoc(user)},
    {item: child, model: ModelType.GROUP},
    role)

  return {
    msg: `Successfully registered user ${user.uiName} with group ${name}, under a ${role} role`,
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
  let {user, child, role} = await getUserChildAndRole<IFomGroup>(req, res)

  if (authLevel(role) > authLevel(RoleType.WRITE))
    throw new Error(`400: ${user.uiName} does not have appropriate authorization over table ${child.uiName}`)

  if (newPassword && role === RoleType.OWNER) child.password = saltAndHash(newPassword) ?? child.password
  else if (newPassword)
    throw new Error(`400: Invalid authorization to update group name or password. Only the owner can do this`)

  child.uiName = newName ?? child.uiName

  await groupRenew(child as IFomGroup)

  return {
    msg: `${user._id} successfully updated ${child.uiName}`,
    item: child
  }
}
