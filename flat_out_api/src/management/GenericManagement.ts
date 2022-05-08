import {Request, Response} from "express";
import {authLevel, extractImageBuffer, preDocRemoval} from "./util/GenericPartials";
import {getControllerComponentAndRoleUrl, getReferenceObject} from "./util/AuthorizationPartials";
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
  let {controller, component, role} = await getControllerComponentAndRoleUrl(req, res)


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
 * Update some components' avatar. This component is either referenced in
 * @param req
 * @param res
 */
export async function componentUpdateAvatar(req: Request, res: Response): Promise<IFomRes> {
  let {dbObject, role} = await getReferenceObject(req, res)

  if (authLevel(role) > authLevel(RoleType.WRITER)) throw new Error(
    `400: Invalid authorization over ${dbObject.uiName} to update avatar`)

  dbObject.avatar = await extractImageBuffer(req)
  await dbObject.save()

  return {
    msg: "Successfully updated avatar"
  }
}

/**
 * Remove a component document from the MongoDB gracefully
 * @param req
 * @param res
 */
export async function componentDelete(req: Request, res: Response): Promise<IFomRes> {
  let {controller, component, role} = await getControllerComponentAndRoleUrl(req, res)

  let type: ModelType = <ModelType>req.params.component
  if (role != RoleType.OWNER) throw new Error(`400: Invalid authorization to complete ${type} deletion`)

  await preDocRemoval(component, component.children, component.parents)
  await component.deleteOne()

  return {
    msg: `${controller._id} successfully deleted ${type} ${component.uiName}`
  }
}