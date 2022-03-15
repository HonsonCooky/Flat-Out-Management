import {Request, Response} from "express";
import {IFomRes} from "../interfaces/IFomRes";
import {IUser} from "../schemas/documents/UserSchema";
import {getController} from "./util/Partials";
import {ITable, TableModel} from "../schemas/documents/TableSchema";
import {saltAndHash} from "./util/AuthPartials";

export async function tableRegister(req: Request, res: Response): Promise<IFomRes> {
  let user: IUser = await getController(res)
  let {name, password, fields, records, owner} = req.body
  let length = fields?.length ?? 0

  let table: ITable = new TableModel({
    uiName: name,
    password: saltAndHash(password) ?? null,
    length,
    fields,
    records
  })

  //
  // if (owner){
  //   let {} = getParentChildAndAssociation()
  // }

  // await table.save()

  return {
    msg: `Successfully `
  }
}