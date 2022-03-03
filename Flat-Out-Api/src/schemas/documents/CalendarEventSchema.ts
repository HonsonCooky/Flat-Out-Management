import {Schema} from "mongoose";
import {IFomDocument} from "../../interfaces/IFomDocument";
import {FomDocumentSchema} from "../util/FomDocumentSchema";
import {FOM_NAME} from "../util/SchemaPartials";

/**
 * FOM CALENDAR EVENT: A tuple between a date, title, message, and those involved.
 */
export interface ICalendarEvent extends IFomDocument {
  date: Date,
  title: string,
  message: string,
}

export const CalendarEventSchema = new Schema<ICalendarEvent>({
  ...FomDocumentSchema,
  date: {type: Date, required: [true, "Missing calendar event date"]},
  title: FOM_NAME,
  message: String
}, {timestamps: true})
