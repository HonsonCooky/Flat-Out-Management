import mongoose, {Schema} from "mongoose";
import {GroupId, ListId, Name, Password, ReqUserId, Update} from "./_SchemaTypes";

/** ---------------------------------------------------------------------------------------------------------------
 * USER SCHEMA:
 * The User Schema is an aggregate of information on some user. The normal information is collected. Name, Email,
 * Password. Each user will be associated to some Group (their flat), and may contain several different lists. Groups
 * and Lists are associated by some identifying string. That string will find the Group/List in question.
 --------------------------------------------------------------------------------------------------------------- */
export interface User {
  id: string,
  name: string,
  password: string,
  group?: string,
  groupsByAssociation?: string[],
  lists?: string[]
}

export type SanitizedUser = Omit<User, "password"> // Don't give the user their password
export type UpdateUser = Omit<Update, 'update'> & { update: User }

export const UserSchema = new Schema({
  id: ReqUserId,
  name: Name,
  password: Password,
  group: GroupId,
  groupsByAssociation: [GroupId],
  lists: [ListId],
  onLeave: [Date],
}, {timestamps: true})

export const UserModel = mongoose.model("Users", UserSchema)