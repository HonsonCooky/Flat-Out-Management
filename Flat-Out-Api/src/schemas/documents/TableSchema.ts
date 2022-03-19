import {IFomComponent} from "../../interfaces/IFomComponent";
import {model, Schema} from "mongoose";
import {FomComponentSchemaDef} from "../util/FomComponentSchemaDef";
import {ModelEnum} from "../../interfaces/FomEnums";
import {FOM_ROW, FOM_TABLE_CONFIG} from "../util/FomSchemaDefinitionProperties";
import {IFomTableRow} from "../../interfaces/IFomTableRow";
import {IFomTableConfig} from "../../interfaces/IFomTableConfig";


/** ---------------------------------------------------------------------------------------------------------------
 * TABLE SCHEMA: The List Schema is a front for an array of items.
 --------------------------------------------------------------------------------------------------------------- */
export interface ITable extends IFomComponent {
  fields: IFomTableRow,
  records: IFomTableRow[],
  config: IFomTableConfig
}

const TableSchema = new Schema<ITable>({
  ...FomComponentSchemaDef,
  fields: FOM_ROW,
  records: [FOM_ROW],
  config: FOM_TABLE_CONFIG
}, {timestamps: true})

export const TableModel = model<ITable>(ModelEnum.TABLE, TableSchema)