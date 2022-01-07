import mongoose, {Schema} from "mongoose";
import {DefaultTrue, Id, Name, Password, Role, UniName} from "./_SchemaTypes";


/** ---------------------------------------------------------------------------------------------------------------
 * GROUP SCHEMA:
 * The Group Schema contains an object, which provides access to a group. Is its essence, a group is a hub. A central
 * location for all members of the group (flat). For this
 --------------------------------------------------------------------------------------------------------------- */
const UserAndRole = new Schema({
  user: Name,
  role: Role,
  onLeave: [Date]
})

const ChoreConfig = new Schema({
  choresAutoFill: DefaultTrue,
  choresLoop: DefaultTrue,
})

const GroupSchema = new Schema({
  name: UniName,
  password: Password,
  users: [UserAndRole],
  chores: Id,
  choreConfig: ChoreConfig,
  messages: Id,
  games: [Id],
  extraLists: [Id]
}, {timestamps: true})

export const GroupModel = mongoose.model("Groups", GroupSchema)
