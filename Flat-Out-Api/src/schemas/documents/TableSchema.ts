import {IFomComponent} from "../../interfaces/IFomComponent";
import {model, Schema} from "mongoose";
import {FomComponentSchemaDef} from "../util/FomComponentSchemaDef";
import {ModelEnum, TimeIntervalUnits} from "../../interfaces/FomEnums";
import {FOM_ROW, FOM_TABLE_OPTIONS_ROTATIONS} from "../util/FomSchemaDefinitionProperties";
import {IFomAssociation} from "../../interfaces/IFomAssociation";


/** ---------------------------------------------------------------------------------------------------------------
 * TABLE SCHEMA: The List Schema is a front for an array of items.
 --------------------------------------------------------------------------------------------------------------- */
export interface ITableColumnRotations {
  column: string,
  intervalUnit: TimeIntervalUnits,
  intervalValue: number,
}

export type IRow = (string | IFomAssociation | Date)[]

export interface ITable extends IFomComponent {
  fields: IRow,
  records: IRow[],
  rotations: ITableColumnRotations[]
}

const TableSchema = new Schema<ITable>({
  ...FomComponentSchemaDef,
  fields: FOM_ROW,
  records: [FOM_ROW],
  rotations: [FOM_TABLE_OPTIONS_ROTATIONS]
}, {timestamps: true})

export const TableModel = model<ITable>(ModelEnum.TABLE, TableSchema)