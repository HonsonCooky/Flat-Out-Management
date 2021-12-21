import mongoose, {Schema} from "mongoose";
import {ListId, Name, Password, ReqGroupId, UserId} from "./_SchemaTypes";


/** ---------------------------------------------------------------------------------------------------------------
 * GROUP SCHEMA:
 * The Group Schema contains an object, which provides access to a group. Is its essence, a group is a hub. A central
 * location for all members of the group (flat). For this
 --------------------------------------------------------------------------------------------------------------- */
const GroupSchema = new Schema({
  id: ReqGroupId,
  groupName: Name,
  password: Password,
  leader: UserId,
  users: [UserId],
  games: [ListId],
  chores: [ListId],
  messages: [ListId],
  extraLists: [ListId],
  choresAutoFill: Boolean,
  choresLoop: Boolean,
}, {timestamps: true})

export const GroupModel = mongoose.model("Groups", GroupSchema)