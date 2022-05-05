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
import {models, Types} from "mongoose";

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
 * @param id
 * @param children
 */
export async function componentPushChildren(c: IFomController | IFomComponent, id: Types.ObjectId,
  ...children: IFomAssociation[]) {
  // Update new children list with ones not mentioned from old
  children.push(
    ...c.children.filter((ca: IFomAssociation) => children.some((pa: IFomAssociation) => !ca.ref.equals(pa.ref))))

  // Remove all children who do not have a valid association
  children = await Promise.all(
    children.filter(async (ca: IFomAssociation) => !models[ca.model].findOne({_id: ca.ref})))

  // Set children of controller || component
  c.children = children
}

/**
 * Overwrite current parent associations with new ones
 * @param c
 * @param id
 * @param parents
 */
export async function componentPushParents(c: IFomComponent, id: Types.ObjectId, ...parents: IFomAssociation[]) {
  // Update new parents list with ones not mentioned from old
  parents.push(
    ...c.children.filter((ca: IFomAssociation) => parents.some((pa: IFomAssociation) => !ca.ref.equals(pa.ref))))

  // Remove all parents who do not have a valid association
  parents = await Promise.all(
    parents.filter(async (ca: IFomAssociation) => !models[ca.model].findOne({_id: ca.ref})))

  if (parents.length === 0) throw new Error('400: No more parents after update. Delete table instead.')

  // Ensure at least one OWNER remains
  if (!parents.some((a: IFomAssociation) => a.role === RoleType.OWNER)) {
    // If no OWNER, try set one of the WRITERS to owner
    let writer = parents.find((ca: IFomAssociation) => ca.role === RoleType.WRITER)
    if (writer) writer.role = RoleType.OWNER
    else parents[0].role = RoleType.OWNER // Last ditch effort
  }

  // Set parents of controller || component
  c.parents = parents
}