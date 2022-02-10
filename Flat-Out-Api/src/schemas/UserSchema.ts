import {model, Schema} from "mongoose";
import {DateFromToday} from "./_schemaTypes";
import {ModelEnum} from "../interfaces/_enums";
import {IFOMProtectedNode} from "../interfaces/_fomObjects";
import {FOMProtectedNodeSchema} from "./_baseSchemas";

/** ---------------------------------------------------------------------------------------------------------------
 * USER SCHEMA:
 * The User Schema is an aggregate of information on some user. The normal information is collected. Name, Email,
 * Password. Each user will be associated to some Group (their flat), and may contain several lists. Groups
 * and Lists are associated by some identifying string. That string will find the Group/List in question.
 --------------------------------------------------------------------------------------------------------------- */

export interface IUser extends IFOMProtectedNode {
  outOfFlatDates: Date[]
}

const UserSchema = new Schema<IUser>({
  ...FOMProtectedNodeSchema,
  outOfFlatDates: [DateFromToday]
}, {timestamps: true})

export const UserModel = model<IUser>(ModelEnum.USER, UserSchema)
