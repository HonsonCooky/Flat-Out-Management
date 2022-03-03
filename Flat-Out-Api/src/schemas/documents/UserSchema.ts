import {IFomDocument} from "../../interfaces/IFomDocument";
import {model, Schema, Types} from "mongoose";
import {FomDocumentSchema} from "../util/FomDocumentSchema";
import {ModelEnum} from "../../interfaces/FomEnums";
import {FOM_DYNAMIC_UUID} from "../util/SchemaPartials";
import {CalendarEventSchema, ICalendarEvent} from "./CalendarEventSchema";


/** ---------------------------------------------------------------------------------------------------------------
 * USER SCHEMA:
 * The User Schema is an aggregate of information on some user. The normal information is collected. Name, Email,
 * Password. Each user will be associated to some Group (their flat), and may contain several lists. Groups
 * and Lists are associated by some identifying string. That string will find the Group/List in question.
 --------------------------------------------------------------------------------------------------------------- */
export interface IUser extends IFomDocument {
  dynUuid: Types.ObjectId,
  outOfFlatDates: ICalendarEvent[]
}

const UserSchema = new Schema<IUser>({
  ...FomDocumentSchema,
  dynUuid: FOM_DYNAMIC_UUID,
  outOfFlatDates: [CalendarEventSchema]
}, {timestamps: true})

export const UserModel = model<IUser>(ModelEnum.USER, UserSchema)