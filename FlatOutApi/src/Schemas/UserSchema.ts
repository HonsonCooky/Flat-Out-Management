import mongoose, {Schema, Document} from "mongoose";
import {DateFromToday, EntityRoleAndRefType, Name, Password, Token} from "./_SchemaTypes";
import {ModelEnum} from "../Interfaces/_Enums";
import {Named, Linked, TimeStamped} from "../Interfaces/_FOMObjects";

/** ---------------------------------------------------------------------------------------------------------------
 * USER SCHEMA:
 * The User Schema is an aggregate of information on some user. The normal information is collected. Name, Email,
 * Password. Each user will be associated to some Group (their flat), and may contain several lists. Groups
 * and Lists are associated by some identifying string. That string will find the Group/List in question.
 --------------------------------------------------------------------------------------------------------------- */

export interface User extends Document, Named, Linked, TimeStamped {
  password: string,
  token: string,
  onLeave: Date[]
}

const UserSchema = new Schema<User>({
  name: Name,
  password: Password,
  token: Token,
  groups: [EntityRoleAndRefType],
  onLeave: [DateFromToday]
}, {timestamps: true})

export const UserModel = mongoose.model<User>(ModelEnum.Users, UserSchema)
