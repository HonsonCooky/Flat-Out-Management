import {model, Schema} from "mongoose";
import {FomComponentSchemaDef} from "../util/FomComponentSchemaDef";
import {
  FOM_TABLE_COLUMNS,
  FOM_TABLE_CONFIG_ROTATION,
  FOM_TABLE_FIELD_INDEXES,
  FOM_TABLE_RECORD
} from "../util/FomSchemaDefinitionProperties";
import {IFomTable, ModelType} from "flat-out-interfaces";


/**
 * TABLE SCHEMA: Translates the IFomTable interface into a mongoose.Schema.
 * Tables are used to store a variety of different information, in different formats.
 *
 * - fieldIndexes: outlines which columns in a row should be considered "fields". Front end is responsible for how
 * this information is valuable.
 * - records: A record is a row of cells. Where a cell is a `string || IFomAssociation || Date` object.
 * - rotations: A configuration setting, where each entry outlines a rotation rule for some column in the table.
 * Rotation can be used to automatically update information in a table (for example, chores lists rotate every week)
 */
const TableSchema = new Schema<IFomTable>({
  ...FomComponentSchemaDef,
  columns: FOM_TABLE_COLUMNS,
  fieldIndexes: [FOM_TABLE_FIELD_INDEXES],
  records: [FOM_TABLE_RECORD],
  rotations: [FOM_TABLE_CONFIG_ROTATION]
}, {timestamps: true})

export const TableModel = model<IFomTable>(ModelType.TABLE, TableSchema)