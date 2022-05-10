import {Request, Response} from "express";
import {GroupModel} from "../schemas/documents/GroupSchema";
import {saltAndHash} from "./util/AuthenticationPartials";
import {authLevel, componentUpdateConnections, connectDocuments, getTypeFromDoc} from "./util/GenericPartials";
import {
  getControllerAndComponentUName,
  getControllerComponentAndRoleUrl,
  getRegisteringParent
} from "./util/AuthorizationPartials";
import {groupCalendar} from "./util/GroupCalendar";
import {IFomGroup} from "../interfaces/IFomGroup";
import {IFomRes} from "../interfaces/IFomRes";
import {ModelType, RoleType} from "../interfaces/IFomEnums";
import {IFomDbObject} from "../interfaces/IFomDbObject";

export async function groupRenew(group: IFomGroup) {
  await groupCalendar(group)
  await group.save()
}

/**
 * Create a new group document
 * @param req
 * @param res
 */
export async function groupRegister(req: Request, res: Response): Promise<IFomRes> {
  let parent: IFomDbObject = await getRegisteringParent(req, res)
  let {name, password, } = req.body

  let group: IFomGroup = new GroupModel({
    uiName: name,
    password: saltAndHash(password),
    
  })

  await group.save()

  await connectDocuments(
    {item: parent, model: getTypeFromDoc(parent)},
    {item: group, model: ModelType.GROUP},
    RoleType.OWNER
  )

  return {
    msg: `Successfully registered group ${name} with owner ${parent.uiName}`,
    item: group
  }
}

/**
 * Join a pre-existing group document
 * @param req
 * @param res
 */
export async function groupJoin(req: Request, res: Response): Promise<IFomRes> {
  let {name, role} = req.body

  if (role == RoleType.REQUEST) return groupRequestJoin(req, res);
  if (role == RoleType.OWNER) throw new Error('400: Owner status can only be given by pre-existing owners')

  let {controller, component} = await getControllerAndComponentUName<IFomGroup>(req, res)

  await connectDocuments(
    {item: controller, model: getTypeFromDoc(controller)},
    {item: component, model: ModelType.GROUP},
    role)

  return {
    msg: `Successfully registered user ${controller.uiName} with group ${name}, under a ${role} role`,
    item: component
  }
}

/**
 * Request to join a pre-existing group document without a password
 * @param req
 * @param res
 */
export async function groupRequestJoin(req: Request, res: Response): Promise<IFomRes> {
  let {controller, component} = await getControllerAndComponentUName<IFomGroup>(req, res, true);
  let {name} = req.body

  await connectDocuments(
    {item: controller, model: getTypeFromDoc(controller)},
    {item: component, model: ModelType.GROUP},
    RoleType.REQUEST)

  return {
    msg: `Successfully registered user ${controller.uiName} with group ${name}, under a ${RoleType.REQUEST} role`,
    item: component
  }
}

/**
 * Update a group document ONLY if you're a writer, and sometimes only if you're an owner.
 * @param req
 * @param res
 */
export async function groupUpdate(req: Request, res: Response): Promise<IFomRes> {
  let {newName, newPassword, parents, children} = req.body
  let {controller, component, role} = await getControllerComponentAndRoleUrl<IFomGroup>(req, res)

  if (authLevel(role) > authLevel(RoleType.WRITER))
    throw new Error(`400: ${controller.uiName} does not have appropriate authorization over group ${component.uiName}`)

  if (role === RoleType.OWNER) {
    component.password = saltAndHash(newPassword) ?? component.password
    component.parents = await componentUpdateConnections(component.parents, parents);
  }

  component.uiName = newName ?? component.uiName
  component.children = await componentUpdateConnections(component.children, children, false);

  await groupRenew(component as IFomGroup)

  return {
    msg: `${controller._id} successfully updated ${component.uiName}`,
    item: component
  }
}
