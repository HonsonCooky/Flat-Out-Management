import mongoose, {Schema} from "mongoose";
import {GroupId, ItemId, Name, ReqListId, SessionId, UserId} from "./_SchemaTypes";

/** ---------------------------------------------------------------------------------------------------------------
 * LIST SCHEMA:
 * The List Schema is a front for an array of items. Items (
 --------------------------------------------------------------------------------------------------------------- */
const ListSchema = new Schema({
  id: ReqListId,
  name: Name,
  items: [ItemId],
  associations: [UserId || GroupId],
  sessions: [SessionId]
}, {timestamps: true})

export const ListModel = mongoose.model("Lists", ListSchema)
