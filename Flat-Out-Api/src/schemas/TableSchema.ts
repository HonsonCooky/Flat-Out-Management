import {model, Schema, SchemaDefinitionProperty} from "mongoose";
import {ModelEnum} from "../interfaces/_enums";
import {IFOMNode} from "../interfaces/_fomObjects";
import {IDocModelAndRole} from "../interfaces/_docRoleAndModel";
import {FOMNodeSchema} from "./_baseSchemas";
import {DateFromToday, DocModelAndRoleType} from "./_schemaTypes";

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

export interface ITable extends IFOMNode {
  numOfCols: number,
  titleRow: IRow[],
  contentRow: IRow[],
}

const TableSchema = new Schema<ITable>({
  ...FOMNodeSchema,
  numOfCols: {type: Number, required: [true, `Missing number of columns`]},
  titleRow: [RowSchema(String)],
  contentRow: [RowSchema()]
}, {timestamps: true})

export const TableModel = model<ITable>(ModelEnum.Table, TableSchema)
