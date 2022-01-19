import mongoose, {Schema} from "mongoose";
import {DefaultTrue, Id, Name, Password, Role} from "./_SchemaTypes";
import {checkGroupIds} from "../Management/GroupManagement";


/** ---------------------------------------------------------------------------------------------------------------
 * GROUP SCHEMA:
 * The Group Schema contains an object, which provides access to a group. Is its essence, a group is a hub. A central
 * location for all members of the group (flat). For this
 --------------------------------------------------------------------------------------------------------------- */
const UserAndRole = new Schema({
  user: Id,
  role: Role,
})

const ChoreConfig = new Schema({
  choresAutoFill: DefaultTrue,
  choresLoop: DefaultTrue,
  choresLastUpdate: Date,
})

const GroupSchema = new Schema({
  name: Name,
  password: Password,
  users: [UserAndRole],
  joinRequests: [UserAndRole],
  chores: Id,
  choreConfig: ChoreConfig,
  messages: Id,
  games: [Id],
  extraLists: [Id]
}, {timestamps: true})

GroupSchema.pre('save', async function (){
  const group = this;
  await checkGroupIds(group)
})

export const GroupModel = mongoose.model("Groups", GroupSchema)
