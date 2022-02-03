import mongoose, {Schema} from "mongoose";
import {DocRoleAndRefType, Name} from "./_schemaTypes";
import {ModelEnum} from "../interfaces/_enums";
import {IFOMCollectionDocument} from "../interfaces/_fomObjects";

/** ---------------------------------------------------------------------------------------------------------------
 * LIST SCHEMA:
 * The List Schema is a front for an array of items. Items (
 --------------------------------------------------------------------------------------------------------------- */
export interface ITable extends IFOMCollectionDocument {
  columns: string[],
}

const TableSchema = new Schema<ITable>({
  name: Name,
  associations: [DocRoleAndRefType]
}, {timestamps: true})

export const ListModel = mongoose.model<ITable>(ModelEnum.Lists, TableSchema)
