import mongoose, {Schema} from "mongoose";
import {ItemId, Name, ReqListId, UserId} from "./_SchemaTypes";

/** ---------------------------------------------------------------------------------------------------------------
 * LIST SCHEMA:
 * The List Schema is a front for an array of items. Items (
 --------------------------------------------------------------------------------------------------------------- */
const ListSchema = new Schema({
  id: ReqListId,
  listName: Name,
  listItems: [ItemId],
  associations: [UserId]
}, {timestamps: true})

export const ListModel = mongoose.model("Lists", ListSchema)
