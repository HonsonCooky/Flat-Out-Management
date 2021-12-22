import mongoose, {Schema} from "mongoose";
import {DefaultTrue, ListId, Name, Password, ReqGroupId, ReqUserId, Role} from "./_SchemaTypes";


/** ---------------------------------------------------------------------------------------------------------------
 * GROUP SCHEMA:
 * The Group Schema contains an object, which provides access to a group. Is its essence, a group is a hub. A central
 * location for all members of the group (flat). For this
 --------------------------------------------------------------------------------------------------------------- */
const UserAndRole = new Schema({
  user: ReqUserId,
  role: Role,
})

const ChoreConfig = new Schema({
  choresAutoFill: DefaultTrue,
  choresLoop: DefaultTrue,
})

const GroupSchema = new Schema({
  id: ReqGroupId,
  name: Name,
  password: Password,
  users: [UserAndRole],
  chores: [ListId],
  choreConfig: ChoreConfig,
  games: [ListId],
  messages: [ListId],
  extraLists: [ListId]
}, {timestamps: true})

export const GroupModel = mongoose.model("Groups", GroupSchema)