import {EventType} from "./IFomEnums";

/**
 * An event document
 */
export interface IFomEvent {
  from: Date,
  to: Date,
  eType: EventType,
  header: string,
  message: string,
  colorAssociation: string,
}