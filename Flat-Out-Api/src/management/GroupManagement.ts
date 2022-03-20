import {Request, Response} from "express";
import {IFomRes} from "../interfaces/IFomRes";
import {GroupModel, IGroup} from "../schemas/documents/GroupSchema";
import {saltAndHash} from "./util/AuthenticationPartials";
import {ModelEnum, RoleEnum} from "../interfaces/FomEnums";
import {authLevel, connectDocuments, getTypeFromDoc} from "./util/GenericPartials";
import {IFomController} from "../interfaces/IFomController";
import {IFomComponent} from "../interfaces/IFomComponent";
import {getRegisteringParent, getUserChildAndRole} from "./util/AuthorizationPartials";

/**
 * GROUP REGISTER: Create a new group document
 * @param req
 * @param res
 */
export async function groupRegister(req: Request, res: Response): Promise<IFomRes> {
  let parent: IFomController | IFomComponent = await getRegisteringParent(req, res)
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
 * GROUP UPDATE: Update a group document
 * @param req
 * @param res
 */
export async function groupUpdate(req: Request, res: Response): Promise<IFomRes> {
  let {newName, newPassword} = req.body
  let {user, child, role} = await getUserChildAndRole<IGroup>(req, res)

  if (authLevel(role) > authLevel(RoleEnum.WRITE))
    throw new Error(`400: ${user.uiName} does not have appropriate authorization over table ${child.uiName}`)

  if (newPassword && role === RoleEnum.OWNER) child.password = saltAndHash(newPassword) ?? child.password
  else if (newPassword)
    throw new Error(`400: Invalid authorization to update group name or password. Only the owner can do this`)

  child.uiName = newName ?? child.uiName

  await child.save()

  return {
    msg: `${user._id} successfully updated ${child.uiName}`,
    item: child
  }
}
