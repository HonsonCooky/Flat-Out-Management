import {IFomComponent} from "../../interfaces/IFomComponent";
import {model, Schema} from "mongoose";
import {FomComponentSchemaDef} from "../util/FomComponentSchemaDef";
import {ModelEnum} from "../../interfaces/FomEnums";
import {IRow, RowSchema} from "./RowSchema";


/** ---------------------------------------------------------------------------------------------------------------
 * TABLE SCHEMA: The List Schema is a front for an array of items.
 --------------------------------------------------------------------------------------------------------------- */
export interface ITable extends IFomComponent {
  numOfCols: number,
  titleRow?: IRow,
  contentRows: IRow[],
}

const TableSchema = new Schema<ITable>({
  ...FomComponentSchemaDef,
  numOfCols: {type: Number, required: [true, `Missing number of columns`], minLength: 1, maxlength: 5},
  titleRow: RowSchema,
  contentRows: {type: [RowSchema], required: [true, 'Missing table values']}
}, {timestamps: true})

export const TableModel = model<ITable>(ModelEnum.TABLE, TableSchema)