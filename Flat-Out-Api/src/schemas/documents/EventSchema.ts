import {Schema} from "mongoose";
import {IFomComponent} from "../../interfaces/IFomComponent";
import {FomComponentSchemaDef} from "../util/FomComponentSchemaDef";
import {FOM_NAME} from "../util/FomSchemaDefinitionProperties";

/**
 * FOM CALENDAR EVENT: A tuple between a date, title, message, and those involved.
 */
export interface IEvent extends IFomComponent {
  date: Date,
  title: string,
  message: string,
}

export const EventSchema = new Schema<IEvent>({
  ...FomComponentSchemaDef,
  date: {type: Date, required: [true, "Missing calendar event date"]},
  title: FOM_NAME,
  message: String
}, {timestamps: true})
