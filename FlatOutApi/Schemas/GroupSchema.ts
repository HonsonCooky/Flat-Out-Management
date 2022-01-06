import mongoose, {Schema} from "mongoose";
import {DefaultTrue, ListId, Password, ReqGroupId, ReqUserId, Role, UniName} from "./_SchemaTypes";
import {saltAndHash} from "../Util/Crypto";


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
  name: UniName,
  password: Password,
  users: [UserAndRole],
  chores: ListId,
  choreConfig: ChoreConfig,
  messages: ListId,
  games: [ListId],
  extraLists: [ListId]
}, {timestamps: true})

GroupSchema.pre('save', function () {
  const group: any = this
  group.password = saltAndHash(group.password)
})

export const GroupModel = mongoose.model("Groups", GroupSchema)
