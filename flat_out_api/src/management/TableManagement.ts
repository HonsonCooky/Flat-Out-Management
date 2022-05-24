import {Request, Response} from "express";
import {authLevel, componentUpdateConnections, connectDocuments, getTypeFromDoc} from "./util/GenericPartials";
import {TableModel} from "../schemas/documents/TableSchema";
import {saltAndHash} from "./util/AuthenticationPartials";
import {getControllerComponentAndRoleUrl, getRegisteringParent} from "./util/AuthorizationPartials";
import {tableRotations} from "./util/TableRotations";
import {IFomTable} from "../interfaces/IFomTable";
import {IFomRes} from "../interfaces/IFomRes";
import {ModelType, RoleType} from "../interfaces/IFomEnums";
import {IFomDbObject} from "../interfaces/IFomDbObject";
import {linkAvatar} from "./AvatarManagement";

export async function tableRenew(table: IFomTable) {
  tableRotations(table)
  await table.save()
}

/**
 * Register a TABLE document
 * @param req
 * @param res
 */
export async function tableRegister(req: Request, res: Response): Promise<IFomRes> {
  let parent: IFomDbObject = await getRegisteringParent(req, res)
  let {name, password, fields, records, rotations, avatar} = req.body

  let table: IFomTable = new TableModel({
    uiName: name,
    password: saltAndHash(password) ?? null,
    colLength: records ? Math.max(...records.map((row: any[]) => row.length)) : 0,
    rowLength: records ? records.length : 0,
    fields,
    records,
    rotations,
  })

  if (avatar) await linkAvatar(req, table, avatar)

  await tableRenew(table)

  await connectDocuments(
    {item: parent, model: getTypeFromDoc(parent)},
    {item: table, model: ModelType.TABLE},
    RoleType.OWNER
  )

  return {
    msg: `Successfully registered table ${name} with owner ${parent.uiName}`,
    item: table
  }
}

/**
 * Update a table document
 * @param req
 * @param res
 */
export async function tableUpdate(req: Request, res: Response): Promise<IFomRes> {
  let {newName, newPassword, fields, records, rotations, parents, avatar} = req.body
  let {controller, component, role} = await getControllerComponentAndRoleUrl<IFomTable>(req, res)

  if (authLevel(role) > authLevel(RoleType.WRITER))
    throw new Error(`400: ${controller.uiName} does not have appropriate authorization over table ${component.uiName}`)

  if (role === RoleType.OWNER) {
    component.password = saltAndHash(newPassword) ?? component.password
    component.rotations = rotations ?? component.rotations
    component.parents = await componentUpdateConnections(component.parents, parents);
  }

  component.uiName = newName ?? component.uiName
  component.fields = fields ?? component.fields
  component.records = records ?? component.records

  if (avatar) await linkAvatar(req, component, avatar)

  await tableRenew(component as IFomTable)

  return {
    msg: `${controller._id} successfully updated table ${component.uiName}`,
    item: component
  }
}