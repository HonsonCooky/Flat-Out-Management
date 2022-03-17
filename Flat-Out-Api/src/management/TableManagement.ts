import {Request, Response} from "express";
import {IFomRes} from "../interfaces/IFomRes";
import {IUser} from "../schemas/documents/UserSchema";
import {connectDocuments, getController, getParent, getTypeFromDoc} from "./util/Partials";
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

  let {name, password, fields, records} = req.body
  let length = fields?.length ?? 0

  let table: ITable = new TableModel({
    uiName: name,
    password: saltAndHash(password) ?? null,
    length,
    fields,
    records
  })

  await connectDocuments(
    {item: parent, model: getTypeFromDoc(parent)},
    {item: table, model: ModelEnum.TABLE},
    RoleEnum.OWNER
  )

  return {
    msg: `Successfully registered table ${name} with owner ${parent.uiName}`,
  }
}

/**
 * TABLE GET: Get a table out of MongoDB
 */
export async function tableGet(req: Request, res: Response): Promise<IFomRes> {
  let user: IUser = await getController(res)

  return {
    msg: ""
  }
}