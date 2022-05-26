import {model, Schema, SchemaDefinitionProperty} from "mongoose";
import {ModelType} from "../../interfaces/association";
import {Event, FomCalendar} from "../../interfaces/non-entities/fom-calendar";
import {DbNonEntitySchema} from "./db-non-entity-schema";
import {RepeatCycleSchema} from "../fom-db-objects";

/**
 * Schema definition for {@link Event}
 */
export const EventSchema: SchemaDefinitionProperty<Event> = {
  from: {type: Date, required: true},
  to: {type: Date, required: true},
  title: {type: String, required: true},
  message: String,
  notifyTimeBeforeMs: Number,
  cycle: RepeatCycleSchema
}

/**
 * Schema definition for {@link FomCalendar}
 */
const CalendarSchema = new Schema<FomCalendar>({
  ...DbNonEntitySchema,
  events: [EventSchema]
}, {timestamps: true})

export const CalendarModel = model(ModelType.CALENDAR, CalendarSchema)