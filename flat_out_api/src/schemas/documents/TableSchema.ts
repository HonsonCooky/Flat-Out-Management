import {model, Schema} from "mongoose";
import {FomComponentSchemaDef} from "../util/FomComponentSchemaDef";
import {FOM_TABLE_CONFIG_ROTATION, FOM_TABLE_LENGTH, FOM_TABLE_RECORD} from "../util/FomSchemaDefinitionProperties";
import {IFomTable} from "../../interfaces/IFomTable";
import {ModelType} from "../../interfaces/IFomEnums";


/**
 * Translates the IFomTable interface into a mongoose.Schema.
 * Tables are used to store a variety of different information, in different formats.
 */
const TableSchema = new Schema<IFomTable>({
  ...FomComponentSchemaDef,
  colLength: FOM_TABLE_LENGTH,
  rowLength: FOM_TABLE_LENGTH,
  fields: FOM_TABLE_RECORD,
  records: [FOM_TABLE_RECORD], // Double Array
  rotations: [FOM_TABLE_CONFIG_ROTATION]
}, {timestamps: true})

export const TableModel = model<IFomTable>(ModelType.TABLE, TableSchema)