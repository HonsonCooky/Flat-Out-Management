import mongoose, {Schema} from "mongoose";
import {DateFromToday, DefaultTrue, GenerateEntityAndRole, GenerateId, Name, Password} from "./_SchemaTypes";
import {ModelType} from "../Interfaces/UtilInterfaces";
import {ChoreConfig, Group} from "../Interfaces/GroupInterface";


/** ---------------------------------------------------------------------------------------------------------------
 * GROUP SCHEMA:
 * The Group Schema contains an object, which provides access to a group. Is its essence, a group is a hub. A central
 * location for all members of the group (flat). For this
 --------------------------------------------------------------------------------------------------------------- */

const Config = new Schema<ChoreConfig>({
  related: GenerateId(ModelType.Lists),
  choresAutoFill: DefaultTrue,
  choresLoop: DefaultTrue,
  startingDate: DateFromToday,
})

const GroupSchema = new Schema<Group>({
  name: Name,
  password: Password,
  users: [GenerateEntityAndRole(ModelType.Users)],
  chores: Config,
  messages: GenerateId(ModelType.Lists),
  lists: [GenerateId(ModelType.Lists)]
}, {timestamps: true})


export const GroupModel = mongoose.model<Group>(ModelType.Groups, GroupSchema)
