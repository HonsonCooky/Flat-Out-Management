import {EventType} from "./IFomEnums";

/**
 * EVENT: An event document
 */
export interface IFomEvent {
  date: Date,
  eType: EventType,
  header: string,
  message: string,
  colorAssociation: string,
}