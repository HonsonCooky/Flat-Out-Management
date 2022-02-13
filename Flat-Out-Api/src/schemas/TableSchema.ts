import {model, Schema, SchemaDefinitionProperty} from "mongoose";
import {ModelEnum} from "../interfaces/GlobalEnums";
import {IDocModelAndRole, IFomDoc} from "../interfaces/FomObjects";
import {DateFromToday, DocModelAndRoleType} from "../interfaces/SchemaTypes";
import {FomDocSchema} from "./BaseSchemas";

/** ------------------------------------------------------------------------------------------------------------------
 * ROW SCHEMA: Tables should be an SQL thing, but this is the best way of storing dynamic list data. The row contains
 * information for each item in a list.
 ------------------------------------------------------------------------------------------------------------------*/
export interface IRow {
  cells: string | IDocModelAndRole | Date | undefined[]
}

const RowSchema = (type: SchemaDefinitionProperty = String || DocModelAndRoleType || DateFromToday) => new Schema<IRow>({
  cells: [type]
})


/** ---------------------------------------------------------------------------------------------------------------
 * TABLE SCHEMA: The List Schema is a front for an array of items. Items (
 --------------------------------------------------------------------------------------------------------------- */

export interface ITable extends IFomDoc {
  numOfCols: number,
  titleRow: IRow,
  contentRows: IRow[],
}

const TableSchema = new Schema<ITable>({
  ...FomDocSchema,
  numOfCols: {type: Number, required: [true, `Missing number of columns`]},
  titleRow: RowSchema(String),
  contentRows: [RowSchema()]
}, {timestamps: true})

export const TableModel = model<ITable>(ModelEnum.TABLE, TableSchema)
