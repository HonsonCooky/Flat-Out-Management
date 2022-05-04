import {Request, Response} from "express";
import {authLevel, preDocRemoval} from "./util/GenericPartials";
import {getUserChildAndRoleUrl} from "./util/AuthorizationPartials";
import {tableRenew} from "./TableManagement";
import {groupRenew} from "./GroupManagement";
import {IFomRes} from "../interfaces/IFomRes";
import {ModelType, RoleType} from "../interfaces/IFomEnums";
import {IFomTable} from "../interfaces/IFomTable";
import {IFomGroup} from "../interfaces/IFomGroup";
import {IFomController} from "../interfaces/IFomController";
import {IFomComponent} from "../interfaces/IFomComponent";
import {IFomAssociation} from "../interfaces/IFomAssociation";

/**
 * Retrieve a component from the database from a URL id.
 * @param req
 * @param res
 */
export async function componentGet(req: Request, res: Response): Promise<IFomRes> {
  let {controller, component, role} = await getUserChildAndRoleUrl(req, res)


  let type: ModelType = <ModelType>req.params.component
  if (authLevel(role) > authLevel(RoleType.READER))
    throw new Error(`400: Invalid authorization to get ${type}`)

  switch (type) {
    case ModelType.TABLE:
      await tableRenew(component as IFomTable);
      break;
    case ModelType.GROUP:
      await groupRenew(component as IFomGroup);
      break;
  }

  return {
    msg: `${controller._id} successfully got ${type} ${component.uiName}`,
    item: component
  }
}

/**
 * Remove a component document from the MongoDB gracefully
 * @param req
 * @param res
 */
export async function componentDelete(req: Request, res: Response): Promise<IFomRes> {
  let {controller, component, role} = await getUserChildAndRoleUrl(req, res)

  let type: ModelType = <ModelType>req.params.component
  if (role != RoleType.OWNER) throw new Error(`400: Invalid authorization to complete ${type} deletion`)

  await preDocRemoval(component, component.children, component.parents)
  await component.deleteOne()

  return {
    msg: `${controller._id} successfully deleted ${type} ${component.uiName}`
  }
}

/**
 * Overwrite current child associations with new ones
 * @param c
 * @param role
 * @param children
 */
export function componentPushNewChildren(c: IFomController | IFomComponent, role: RoleType,
  ...children: IFomAssociation[]) {
  // Remove any parents with a higher auth than this role
  children = children.filter((pa: IFomAssociation) => authLevel(pa.role) >= authLevel(role))

  // With a list of legal updated association, alter the remaining
  c.children =
    c.children.filter((ca: IFomAssociation) => children.some((pa: IFomAssociation) => !ca.ref.equals(pa.ref)) ||
      children.length === 0)

  c.children.push(...children)
}

/**
 * Overwrite current parent associations with new ones
 * @param c
 * @param parents
 * @param role
 */
export function componentPushNewParents(c: IFomComponent, role: RoleType, ...parents: IFomAssociation[]) {
  // Remove any parents with a higher auth than this role
  parents = parents.filter((pa: IFomAssociation) => authLevel(pa.role) >= authLevel(role))

  // With a list of legal updated association, alter the remaining
  c.parents = c.parents.filter((ca: IFomAssociation) => parents.some((pa: IFomAssociation) => !ca.ref.equals(pa.ref)) ||
    parents.length === 0)

  c.parents.push(...parents)
}