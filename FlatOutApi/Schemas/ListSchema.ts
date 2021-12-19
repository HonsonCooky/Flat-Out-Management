import mongoose, {Schema} from "mongoose";
import {ItemId, ListId, Name, Update, UserId} from "./_SchemaTypes";

/** ---------------------------------------------------------------------------------------------------------------
 * LIST SCHEMA:
 * The List Schema is a front for an array of items. Items (
 --------------------------------------------------------------------------------------------------------------- */
export interface List {
  id: string,
  listName: string,
  listItems?: string[]
  association?: string[]
}

export type UpdateList = Omit<Update, 'update'> & { update: List }

const ListSchema = new Schema({
  id: ListId,
  listName: Name,
  listItems: [ItemId],
  associations: [UserId]
}, {timestamps: true})

export const ListModel = mongoose.model("Lists", ListSchema)
