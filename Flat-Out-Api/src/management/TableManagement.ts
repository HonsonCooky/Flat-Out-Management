import {Request, Response} from "express";
import {IFomRes} from "../interfaces/IFomRes";
import {connectDocuments, getParent, getParentChildAndAssociation, getTypeFromDoc, roleScore} from "./util/Partials";
import {ITable, TableModel} from "../schemas/documents/TableSchema";
import {saltAndHash} from "./util/BcryptPartials";
import {IFomController} from "../interfaces/IFomController";
import {IFomComponent} from "../interfaces/IFomComponent";
import {ModelEnum, RoleEnum} from "../interfaces/FomEnums";

/**
 * TABLE REGISTER: Register a TABLE document
 * @param req
 * @param res
 */
export async function tableRegister(req: Request, res: Response): Promise<IFomRes> {
  let parent: IFomController | IFomComponent = await getParent(req, res)
  let {name, password, fields, records, config} = req.body

  let table: ITable = new TableModel({
    uiName: name,
    password: saltAndHash(password) ?? null,
    fields,
    records,
    config
  })

  await connectDocuments(
    {item: parent, model: getTypeFromDoc(parent)},
    {item: table, model: ModelEnum.TABLE},
    RoleEnum.OWNER
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
  let {newName, newPassword, records, addRecords, config} = req.body
  let {parent, child, association} = await getParentChildAndAssociation<ITable>(req, res)
  let {role} = association

  if (roleScore(role) > roleScore(RoleEnum.WRITE))
    throw new Error(`400: ${parent.uiName} does not have appropriate authorization over table ${child.uiName}`)

  if ((newName || newPassword)) {
    if (role === RoleEnum.OWNER) {
      child.password = saltAndHash(newPassword) ?? child.password
    } else throw new Error(`400: Invalid authorization to update table password. Only the owner can do this`)
  }

  child.uiName = newName ?? child.uiName
  child.records = records ?? child.records
  child.config = config ?? child.config
  if (addRecords) child.records.push(addRecords)

  await child.save()

  return {
    msg: `${parent._id} successfully updated ${child.uiName}`,
    item: child
  }
}