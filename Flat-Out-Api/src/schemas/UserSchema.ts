import {IFomDocument} from "../interfaces/IFomDocument";
import {model, Schema} from "mongoose";
import {FomDocumentSchema} from "./util/FomDocumentSchema";
import {ModelEnum} from "../interfaces/FomEnums";


/** ---------------------------------------------------------------------------------------------------------------
 * USER SCHEMA:
 * The User Schema is an aggregate of information on some user. The normal information is collected. Name, Email,
 * Password. Each user will be associated to some Group (their flat), and may contain several lists. Groups
 * and Lists are associated by some identifying string. That string will find the Group/List in question.
 --------------------------------------------------------------------------------------------------------------- */
export interface IUser extends IFomDocument {
  outOfFlatDates: Date[]
}

const UserSchema = new Schema<IUser>({
  ...FomDocumentSchema,
  outOfFlatDates: [Date]
}, {timestamps: true})

export const UserModel = model<IUser>(ModelEnum.USER, UserSchema)