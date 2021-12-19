import mongoose, {Schema} from "mongoose";
import {ListId, Name, Password, ReqGroupId, Update, UserId} from "./_SchemaTypes";


/** ---------------------------------------------------------------------------------------------------------------
 * GROUP SCHEMA:
 * The Group Schema contains an object, which provides access to a group. Is its essence, a group is a hub. A central
 * location for all members of the group (flat). For this
 --------------------------------------------------------------------------------------------------------------- */

export interface Group {
  id: string,
  groupName: string,
  password: string,
  leader?: string,
  users?: string[],
  games?: string[],
  chores?: string[],
  messages?: string[],
  extraLists?: string[],
  choresAutoFill?: boolean,
  choresLoop?: boolean,
  createdAt: string,
  updatedAt: string,
}

export type SanitizedGroup = Omit<Group, "password">
export type UpdateGroup = Omit<Update, 'update'> & { update: Group }

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