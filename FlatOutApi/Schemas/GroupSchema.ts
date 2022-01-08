import mongoose, {Schema} from "mongoose";
import {DefaultTrue, Id, Name, Password, Role} from "./_SchemaTypes";
import {checkIds} from "../Util/IdChecks";
import {UserModel} from "./UserSchema";
import {ListModel} from "./ListSchema";


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
})

const GroupSchema = new Schema({
  name: Name,
  password: Password,
  users: [UserAndRole],
  chores: Id,
  choreConfig: ChoreConfig,
  messages: Id,
  games: [Id],
  extraLists: [Id]
}, {timestamps: true})

GroupSchema.pre('save', async function (){
  const group: any = this
  await checkIds(UserModel, ...group.users.map((uar: any) => uar.user))
  await checkIds(ListModel, group.chores, group.messages, ...group.games, ...group.extraLists)
})

GroupSchema.post('save', async function (){
  const group: any = this
  if (group.users.length === 0) group.deleteOne()
})

export const GroupModel = mongoose.model("Groups", GroupSchema)
