import mongoose, {Schema} from "mongoose";
import {DateFromToday, DocRoleAndRefType, Name, Password, Token} from "./_schemaTypes";
import {ModelEnum} from "../interfaces/_enums";
import {FOMCollectionDocument} from "../interfaces/_fomObjects";

/** ---------------------------------------------------------------------------------------------------------------
 * USER SCHEMA:
 * The User Schema is an aggregate of information on some user. The normal information is collected. Name, Email,
 * Password. Each user will be associated to some Group (their flat), and may contain several lists. Groups
 * and Lists are associated by some identifying string. That string will find the Group/List in question.
 --------------------------------------------------------------------------------------------------------------- */

export interface User extends FOMCollectionDocument {
  password: string,
  token: string,
  onLeave: Date[]
}

const UserSchema = new Schema<User>({
  name: Name,
  password: Password,
  token: Token,
  associations: [DocRoleAndRefType],
  onLeave: [DateFromToday]
}, {timestamps: true})

export const UserModel = mongoose.model<User>(ModelEnum.Users, UserSchema)
