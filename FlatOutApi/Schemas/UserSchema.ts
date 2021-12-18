import mongoose, {Schema} from "mongoose";
import {idValidator, IIdValidator, nameValidator, Update} from "./Validators";

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
export const userId = {...IIdValidator, validate: idValidator('U')}

export const UserSchema = new Schema({
  // uuid: Used to identify the user.
  id: userId,
  // name: The name which an application will use.
  name: {type: String, required: [true, 'Missing name'], validate: nameValidator},
  // password: Can't be unique, else two users can't have the same password hash+salt mix
  password: {type: String, required: [true, 'Missing password']},
  // group: The flat group which this user is a member of
  group: String,
  // groupsByAssociation: The flat groups you have an association with (ones that you
  groupsByAssociation: [String],
  // Can't be unique, multiple users can point to the same lists
  lists: [{type: String, lowercase: true}],
}, {timestamps: true})

export const UserModel = mongoose.model("Users", UserSchema)