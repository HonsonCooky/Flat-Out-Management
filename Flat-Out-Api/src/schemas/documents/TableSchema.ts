import {IFomComponent} from "../../interfaces/IFomComponent";
import {model, Schema} from "mongoose";
import {FOM_ASSOCIATION} from "../util/FomSchemaDefinitionProperties";
import {FomComponentSchemaDef} from "../util/FomComponentSchemaDef";
import {ModelEnum} from "../../interfaces/FomEnums";


/** ------------------------------------------------------------------------------------------------------------------
 * ROW SCHEMA: Tables should be an SQL thing, but this is the best way of storing dynamic list data. The row contains
 * information for each item in a list.
 ------------------------------------------------------------------------------------------------------------------*/
export interface IRow {
  cells: string | IFomComponent | Date | undefined[]
}

const RowSchema = new Schema<IRow>({
  cells: [{type: String || FOM_ASSOCIATION || Date}]
})


/** ---------------------------------------------------------------------------------------------------------------
 * TABLE SCHEMA: The List Schema is a front for an array of items.
 --------------------------------------------------------------------------------------------------------------- */
export interface ITable extends IFomComponent {
  numOfCols: number,
  titleRow: IRow,
  contentRows: IRow[],
}

const TableSchema = new Schema<ITable>({
  ...FomComponentSchemaDef,
  numOfCols: {type: Number, required: [true, `Missing number of columns`], min: 1, maxlength: 5},
  titleRow: RowSchema,
  contentRows: [RowSchema]
}, {timestamps: true})

export const TableModel = model<ITable>(ModelEnum.TABLE, TableSchema)