import {IFomComponent} from "../../interfaces/IFomComponent";
import {model, Schema} from "mongoose";
import {FomComponentSchemaDef} from "../util/FomComponentSchemaDef";
import {ModelEnum} from "../../interfaces/FomEnums";
import {FOM_ROW} from "../util/FomSchemaDefinitionProperties";
import {IFomAssociation} from "../../interfaces/IFomAssociation";


/** ---------------------------------------------------------------------------------------------------------------
 * TABLE SCHEMA: The List Schema is a front for an array of items.
 --------------------------------------------------------------------------------------------------------------- */
export type IRow = (string | IFomAssociation | Date)[]

export interface ITable extends IFomComponent {
  fields: IRow,
  records: IRow[],
}

const TableSchema = new Schema<ITable>({
  ...FomComponentSchemaDef,
  fields: FOM_ROW,
  records: [FOM_ROW]
}, {timestamps: true})

export const TableModel = model<ITable>(ModelEnum.TABLE, TableSchema)