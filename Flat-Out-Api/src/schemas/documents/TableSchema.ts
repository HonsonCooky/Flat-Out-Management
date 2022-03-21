import {model, Schema} from "mongoose";
import {FomComponentSchemaDef} from "../util/FomComponentSchemaDef";
import {ModelEnum} from "../../../../Flat-Out-Interfaces/interfaces/FomEnums";
import {FOM_TABLE_CONFIG, FOM_TABLE_HEADER, FOM_TABLE_RECORD} from "../util/FomSchemaDefinitionProperties";
import {IFomTable} from "../../../../Flat-Out-Interfaces/interfaces/IFomTable";


/** ---------------------------------------------------------------------------------------------------------------
 * TABLE SCHEMA: The List Schema is a front for an array of items.
 --------------------------------------------------------------------------------------------------------------- */
const TableSchema = new Schema<IFomTable>({
  ...FomComponentSchemaDef,
  fields: FOM_TABLE_HEADER,
  records: [FOM_TABLE_RECORD],
  config: FOM_TABLE_CONFIG
}, {timestamps: true})

export const TableModel = model<IFomTable>(ModelEnum.TABLE, TableSchema)