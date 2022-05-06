import {Request, Response} from "express";
import {authLevel, preDocRemoval} from "./util/GenericPartials";
import {getUserChildAndRoleUrl} from "./util/AuthorizationPartials";
import {tableRenew} from "./TableManagement";
import {groupRenew} from "./GroupManagement";
import {IFomRes} from "../interfaces/IFomRes";
import {ModelType, RoleType} from "../interfaces/IFomEnums";
import {IFomTable} from "../interfaces/IFomTable";
import {IFomGroup} from "../interfaces/IFomGroup";

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