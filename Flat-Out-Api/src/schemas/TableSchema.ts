import {IFomDocument} from "../interfaces/IFomDocument";
import {model, Schema} from "mongoose";
import {FOM_ASSOCIATION} from "./util/SchemaPartials";
import {FomDocumentSchema} from "./util/FomDocumentSchema";
import {ModelEnum} from "../interfaces/FomEnums";


/** ------------------------------------------------------------------------------------------------------------------
 * ROW SCHEMA: Tables should be an SQL thing, but this is the best way of storing dynamic list data. The row contains
 * information for each item in a list.
 ------------------------------------------------------------------------------------------------------------------*/
export interface IRow {
  cells: string | IFomDocument | Date | undefined[]
}

const RowSchema = new Schema<IRow>({
  cells: [{type: String || FOM_ASSOCIATION || Date}]
})


/** ---------------------------------------------------------------------------------------------------------------
 * TABLE SCHEMA: The List Schema is a front for an array of items.
 --------------------------------------------------------------------------------------------------------------- */
export interface ITable extends IFomDocument {
  numOfCols: number,
  titleRow: IRow,
  contentRows: IRow[],
}

const TableSchema = new Schema<ITable>({
  ...FomDocumentSchema,
  numOfCols: {type: Number, required: [true, `Missing number of columns`]},
  titleRow: RowSchema,
  contentRows: [RowSchema]
}, {timestamps: true})

export const TableModel = model<ITable>(ModelEnum.TABLE, TableSchema)