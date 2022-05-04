import {EventType} from "./IFomEnums";

/**
 * An event document
 */
export interface IFomEvent {
  date: Date,
  eType: EventType,
  header: string,
  message: string,
  colorAssociation: string,
}