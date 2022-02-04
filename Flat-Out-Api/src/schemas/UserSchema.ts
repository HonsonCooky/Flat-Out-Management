import mongoose, {Schema} from "mongoose";
import {DateFromToday, DocRoleAndRefType, Name, Nickname, Password} from "./_schemaTypes";
import {ModelEnum} from "../interfaces/_enums";
import {IFOMCollectionDocument} from "../interfaces/_fomObjects";

/** ---------------------------------------------------------------------------------------------------------------
 * USER SCHEMA:
 * The User Schema is an aggregate of information on some user. The normal information is collected. Name, Email,
 * Password. Each user will be associated to some Group (their flat), and may contain several lists. Groups
 * and Lists are associated by some identifying string. That string will find the Group/List in question.
 --------------------------------------------------------------------------------------------------------------- */

export interface IUser extends IFOMCollectionDocument {
  password: string,
  nickname?: string,
  onLeave: Date[]
}

const UserSchema = new Schema<IUser>({
  name: Name,
  associations: [DocRoleAndRefType],
  password: Password,
  nickname: Nickname,
  onLeave: [DateFromToday]
}, {timestamps: true})

export const UserModel = mongoose.model<IUser>(ModelEnum.Users, UserSchema)
