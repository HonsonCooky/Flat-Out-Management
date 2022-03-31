import {model, Schema} from "mongoose";
import {FomComponentSchemaDef} from "../util/FomComponentSchemaDef";
import {FOM_TABLE_COMPOUND, FOM_TABLE_CONFIG_ROTATION} from "../util/FomSchemaDefinitionProperties";
import {IFomTable, ModelType} from "flat-out-interfaces";


/** ---------------------------------------------------------------------------------------------------------------
 * TABLE SCHEMA: The List Schema is a front for an array of items.
 --------------------------------------------------------------------------------------------------------------- */
const TableSchema = new Schema<IFomTable>({
  ...FomComponentSchemaDef,
  records: FOM_TABLE_COMPOUND,
  rotationConfigs: [FOM_TABLE_CONFIG_ROTATION]
}, {timestamps: true})

export const TableModel = model<IFomTable>(ModelType.TABLE, TableSchema)