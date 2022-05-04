import {Request, Response} from "express";
import {authLevel, connectDocuments, getTypeFromDoc} from "./util/GenericPartials";
import {TableModel} from "../schemas/documents/TableSchema";
import {saltAndHash} from "./util/AuthenticationPartials";
import {getRegisteringParent, getUserChildAndRoleUrl} from "./util/AuthorizationPartials";
import {tableRotations} from "./util/TableRotations";
import {IFomTable} from "../interfaces/IFomTable";
import {IFomRes} from "../interfaces/IFomRes";
import {IFomController} from "../interfaces/IFomController";
import {IFomComponent} from "../interfaces/IFomComponent";
import {ModelType, RoleType} from "../interfaces/IFomEnums";
import {componentPushNewParents} from "./GenericManagement";

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
  let parent: IFomController | IFomComponent = await getRegisteringParent(req, res)
  let {name, password, fieldIndexes, records, rotations} = req.body

  let table: IFomTable = new TableModel({
    uiName: name,
    password: saltAndHash(password) ?? null,
    columns: Math.max(...records.map((row: any[]) => row.length)),
    fieldIndexes,
    records,
    rotations,
  })

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
  let {newName, newPassword, fieldIndexes, records, addRecords, rotations, rotation, parents, newParents} = req.body
  let {controller, component, role} = await getUserChildAndRoleUrl<IFomTable>(req, res)

  if (authLevel(role) > authLevel(RoleType.WRITER))
    throw new Error(`400: ${controller.uiName} does not have appropriate authorization over table ${component.uiName}`)

  if (role === RoleType.OWNER) {
    component.password = saltAndHash(newPassword) ?? component.password

    component.rotations = rotations ?? component.rotations
    if (rotation) component.rotations.push(rotation)

    component.parents = parents ?? component.parents
    if (newParents) componentPushNewParents(component, role, ...newParents)
  } else if (newPassword)
    throw new Error(`400: Invalid authorization to update table password. Only the owner can do this`)


  component.uiName = newName ?? component.uiName
  component.fieldIndexes = fieldIndexes ?? component.fieldIndexes
  component.records = records ?? component.records
  if (addRecords) component.records.push(addRecords)

  await tableRenew(component as IFomTable)

  return {
    msg: `${controller._id} successfully updated table ${component.uiName}`,
    item: component
  }
}