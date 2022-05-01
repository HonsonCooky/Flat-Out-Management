import {Request, Response} from "express";
import {GroupModel} from "../schemas/documents/GroupSchema";
import {saltAndHash} from "./util/AuthenticationPartials";
import {authLevel, connectDocuments, getTypeFromDoc} from "./util/GenericPartials";
import {getRegisteringParent, getUserChildAndRole} from "./util/AuthorizationPartials";
import {groupCalendar} from "./util/GroupCalendar";
import {IFomGroup} from "../interfaces/IFomGroup";
import {IFomRes} from "../interfaces/IFomRes";
import {IFomController} from "../interfaces/IFomController";
import {IFomComponent} from "../interfaces/IFomComponent";
import {ModelType, RoleType} from "../interfaces/IFomEnums";

export async function groupRenew(group: IFomGroup) {
  await groupCalendar(group)
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
  console.log("here", group);

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
