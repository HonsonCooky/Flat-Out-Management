import mongoose, {Schema} from "mongoose";
import {DateFromToday, DefaultTrue, EntityAndRole, Id, Name, Password} from "./_SchemaTypes";
import {ModelType} from "../_Interfaces";


/** ---------------------------------------------------------------------------------------------------------------
 * GROUP SCHEMA:
 * The Group Schema contains an object, which provides access to a group. Is its essence, a group is a hub. A central
 * location for all members of the group (flat). For this
 --------------------------------------------------------------------------------------------------------------- */

const ChoreConfig = {
  related: Id(ModelType.Lists),
  choresAutoFill: DefaultTrue,
  choresLoop: DefaultTrue,
  startingDate: DateFromToday,
}

const GroupSchema = new Schema({
  name: Name,
  password: Password,
  users: [EntityAndRole(ModelType.Users)],
  chores: ChoreConfig,
  messages: Id(ModelType.Lists),
  lists: [Id(ModelType.Lists)]
}, {timestamps: true})


export const GroupModel = mongoose.model(ModelType.Groups, GroupSchema)
