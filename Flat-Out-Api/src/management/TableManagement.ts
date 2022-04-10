import {Request, Response} from "express";
import {authLevel, connectDocuments, getTypeFromDoc} from "./util/GenericPartials";
import {TableModel} from "../schemas/documents/TableSchema";
import {saltAndHash} from "./util/AuthenticationPartials";
import {getRegisteringParent, getUserChildAndRole} from "./util/AuthorizationPartials";
import {IFomComponent, IFomController, IFomRes, IFomTable, ModelType, RoleType} from "flat-out-interfaces";
import {tableRotations} from "./util/TableRotations";

export async function tableRenew(table: IFomTable){
  tableRotations(table)
  await table.save()
}

/**
 * TABLE REGISTER: Register a TABLE document
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
 * TABLE UPDATE: Update a group document
 * @param req
 * @param res
 */
export async function tableUpdate(req: Request, res: Response): Promise<IFomRes> {
  let {newName, newPassword, fieldIndexes, records, addRecords, rotations, rotation} = req.body
  let {user, child, role} = await getUserChildAndRole<IFomTable>(req, res)

  if (authLevel(role) > authLevel(RoleType.WRITE))
    throw new Error(`400: ${user.uiName} does not have appropriate authorization over table ${child.uiName}`)

  if (newPassword && role === RoleType.OWNER) child.password = saltAndHash(newPassword) ?? child.password
  else if (newPassword)
    throw new Error(`400: Invalid authorization to update table password. Only the owner can do this`)

  child.uiName = newName ?? child.uiName
  child.fieldIndexes = fieldIndexes ?? child.fieldIndexes
  child.records = records ?? child.records
  child.rotations = rotations ?? child.rotations
  if (addRecords) child.records.push(addRecords)
  if (rotation) child.rotations.push(rotation)

  await tableRenew(child as IFomTable)

  return {
    msg: `${user._id} successfully updated table ${child.uiName}`,
    item: child
  }
}