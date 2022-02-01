import mongoose, {Schema, Document} from "mongoose";
import {DefaultTrue, EntityRoleAndRefType, Id, Name, Password} from "./_SchemaTypes";
import {ModelEnum} from "../Interfaces/_Enums";
import {Linked, Named, TimeStamped} from "../Interfaces/_FOMObjects";
import {List} from "./ListSchema";


/** ---------------------------------------------------------------------------------------------------------------
 * GROUP SCHEMA:
 * The Group Schema contains an object, which provides access to a group. Is its essence, a group is a hub. A central
 * location for all members of the group (flat). For this
 --------------------------------------------------------------------------------------------------------------- */

export interface ChoreConfig extends List {
  name: "Chores",
  choresAutoFill: boolean,
  choresLoop: boolean,
}

export interface Group extends Document, Named, Linked, TimeStamped {
  password: string,
  tokens: string[],
  chores: ChoreConfig,
}

const Config = new Schema<ChoreConfig>({
  associations: [EntityRoleAndRefType],
  choresAutoFill: DefaultTrue,
  choresLoop: DefaultTrue,
  predictions: [EntityRoleAndRefType]
})

const GroupSchema = new Schema<Group>({
  name: Name,
  password: Password,
  users: [EntityRoleAndRefType(ModelEnum.Users)],
  chores: Config,
  messages: Id(ModelEnum.Lists),
  lists: [Id(ModelEnum.Lists)]
}, {timestamps: true})


export const GroupModel = mongoose.model<Group>(ModelEnum.Groups, GroupSchema)
