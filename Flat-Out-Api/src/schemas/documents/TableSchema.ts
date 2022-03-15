import {IFomComponent} from "../../interfaces/IFomComponent";
import {model, Schema} from "mongoose";
import {FomComponentSchemaDef} from "../util/FomComponentSchemaDef";
import {ModelEnum} from "../../interfaces/FomEnums";
import {IRow, RowSchema} from "./RowSchema";


/** ---------------------------------------------------------------------------------------------------------------
 * TABLE SCHEMA: The List Schema is a front for an array of items.
 --------------------------------------------------------------------------------------------------------------- */
export interface ITable extends IFomComponent {
  length: number,
  fields: IRow,
  records: IRow[],
}

const TableSchema = new Schema<ITable>({
  ...FomComponentSchemaDef,
  length: {type: Number, required: [true, `Missing number of columns`], minLength: 1, maxlength: 5},
  fields: RowSchema,
  records: [RowSchema]
}, {timestamps: true})

export const TableModel = model<ITable>(ModelEnum.TABLE, TableSchema)