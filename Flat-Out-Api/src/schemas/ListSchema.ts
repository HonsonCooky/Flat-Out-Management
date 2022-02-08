import {Schema, model} from "mongoose";
import {DocRoleAndRefType, Id, Name} from "./_schemaTypes";
import {ModelEnum} from "../interfaces/_enums";
import {IFOMCollectionDocument} from "../interfaces/_fomObjects";

/** ---------------------------------------------------------------------------------------------------------------
 * LIST SCHEMA:
 * The List Schema is a front for an array of items. Items (
 --------------------------------------------------------------------------------------------------------------- */
export interface IList extends IFOMCollectionDocument {}

const ListSchema = new Schema<IList>({
  uid: Id,
  name: Name,
  associations: [DocRoleAndRefType]
}, {timestamps: true})

export const ListModel = model<IList>(ModelEnum.Lists, ListSchema)
