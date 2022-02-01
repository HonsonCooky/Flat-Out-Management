import mongoose, {Schema} from "mongoose";
import {DocRoleAndRefType, Name} from "./_SchemaTypes";
import {ModelEnum} from "../Interfaces/_Enums";
import {FOMCollectionDocument} from "../Interfaces/_FOMObjects";

/** ---------------------------------------------------------------------------------------------------------------
 * LIST SCHEMA:
 * The List Schema is a front for an array of items. Items (
 --------------------------------------------------------------------------------------------------------------- */
export interface ITable extends FOMCollectionDocument {
  columns: string[],
}

const TableSchema = new Schema<ITable>({
  name: Name,
  associations: [DocRoleAndRefType]
}, {timestamps: true})

export const ListModel = mongoose.model<ITable>(ModelEnum.Lists, TableSchema)
