import {EventType} from "./IFomEnums";

/**
 * EVENT: An event document
 */
export interface IFomEvent {
  date: Date,
  type: EventType,
  title: string,
  message: string,
}