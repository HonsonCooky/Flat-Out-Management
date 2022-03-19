import {IFomComponent} from "../../interfaces/IFomComponent";
import {model, Schema} from "mongoose";
import {FomComponentSchemaDef} from "../util/FomComponentSchemaDef";
import {ModelEnum} from "../../interfaces/FomEnums";
import {FOM_TABLE_CONFIG, FOM_TABLE_HEADER, FOM_TABLE_RECORD} from "../util/FomSchemaDefinitionProperties";
import {IFomTableHeader, IFomTableRecord} from "../../interfaces/IFomTableContents";
import {IFomTableConfig} from "../../interfaces/IFomTableConfig";


/** ---------------------------------------------------------------------------------------------------------------
 * TABLE SCHEMA: The List Schema is a front for an array of items.
 --------------------------------------------------------------------------------------------------------------- */
export interface ITable extends IFomComponent {
  fields: IFomTableHeader,
  records: IFomTableRecord[],
  config: IFomTableConfig
}

const TableSchema = new Schema<ITable>({
  ...FomComponentSchemaDef,
  fields: FOM_TABLE_HEADER,
  records: [FOM_TABLE_RECORD],
  config: FOM_TABLE_CONFIG
}, {timestamps: true})

export const TableModel = model<ITable>(ModelEnum.TABLE, TableSchema)