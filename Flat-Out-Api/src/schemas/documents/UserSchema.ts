import {model, Schema} from "mongoose";
import {ModelEnum} from "../../interfaces/FomEnums";
import {EventSchema, ICalendarEvent} from "./EventSchema";
import {FomControllerSchemaDef} from "../util/FomControllerSchemaDef";
import {IFomController} from "../../interfaces/IFomController";


/** ---------------------------------------------------------------------------------------------------------------
 * USER SCHEMA:
 * The User Schema is an aggregate of information on some user. The normal information is collected. Name, Email,
 * Password. Each user will be associated to some Group (their flat), and may contain several lists. Groups
 * and Lists are associated by some identifying string. That string will find the Group/List in question.
 --------------------------------------------------------------------------------------------------------------- */
export interface IUser extends IFomController {
  outOfFlatDates: ICalendarEvent[]
}

const UserSchema = new Schema<IUser>({
  ...FomControllerSchemaDef,
  outOfFlatDates: [EventSchema]
}, {timestamps: true})

export const UserModel = model<IUser>(ModelEnum.USER, UserSchema)