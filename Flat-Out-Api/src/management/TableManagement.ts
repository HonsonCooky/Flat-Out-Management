import {Request, Response} from "express";
import {authLevel, connectDocuments, getTypeFromDoc} from "./util/GenericPartials";
import {TableModel} from "../schemas/documents/TableSchema";
import {saltAndHash} from "./util/AuthenticationPartials";
import {getRegisteringParent, getUserChildAndRole} from "./util/AuthorizationPartials";
import {IFomComponent, IFomController, IFomRes, IFomTable, ModelType, RoleType} from "flat-out-interfaces";

/**
 * TABLE REGISTER: Register a TABLE document
 * @param req
 * @param res
 */
export async function tableRegister(req: Request, res: Response): Promise<IFomRes> {
  let parent: IFomController | IFomComponent = await getRegisteringParent(req, res)
  let {name, password, fieldIndexes, records, rotationConfigs} = req.body

  let table: IFomTable = new TableModel({
    uiName: name,
    password: saltAndHash(password) ?? null,
    fieldIndexes,
    records,
    rotationConfigs
  })

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
  let {newName, newPassword, records, addRecords, rotationConfigs} = req.body
  let {user, child, role} = await getUserChildAndRole<IFomTable>(req, res)

  if (authLevel(role) > authLevel(RoleType.WRITE))
    throw new Error(`400: ${user.uiName} does not have appropriate authorization over table ${child.uiName}`)

  if (newPassword && role === RoleType.OWNER) child.password = saltAndHash(newPassword) ?? child.password
  else if (newPassword)
    throw new Error(`400: Invalid authorization to update table password. Only the owner can do this`)

  child.uiName = newName ?? child.uiName
  child.records = records ?? child.records
  child.rotationConfigs = rotationConfigs ?? child.rotationConfigs
  if (addRecords) child.records.push(addRecords)

  await child.save()

  return {
    msg: `${user._id} successfully updated table ${child.uiName}`,
    item: child
  }
}