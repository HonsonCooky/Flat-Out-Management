import {model, Schema, SchemaDefinitionProperty} from "mongoose";
import {ModelType} from "../interfaces/association";
import {FOM_ASSOCIATION} from "./fom-db-objects";


/**
 * Schema Definition for IFomEventNotification
 */
const FOM_EVENT_NOTIFICATION: SchemaDefinitionProperty<> = {
  users: [FOM_ASSOCIATION],
  notificationTime: Date
}

/**
 * Schema Definition for IFomEvent
 */
export const FOM_EVENT: SchemaDefinitionProperty<IFomEvent> = {
  from: {
    type: Date,
    required: true
  },
  to: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  message: String,

  notifications: [FOM_EVENT_NOTIFICATION]
}

/**
 * Translates the FomTable interface into a mongoose.Schema.
 * Tables are utilized to
 */
const CalendarSchema = new Schema<FomCalendar>({
  //TODO
}, {timestamps: true})

export const CalendarModel = model(ModelType.CALENDAR, CalendarSchema)