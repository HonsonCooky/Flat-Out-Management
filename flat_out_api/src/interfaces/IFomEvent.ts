import {EventType} from "./IFomEnums";
import {IFomAssociation} from "./IFomAssociation";

/**
 * Stores when notifications for events should be executed
 */
export interface IFomEventNotification {
  associations: IFomAssociation[],
  notificationTime: Date
}

/**
 * An event document
 */
export interface IFomEvent {
  from: Date,
  to: Date,
  eType: EventType,
  header: string,
  message: string,
  color: string,
  notifications: IFomEventNotification[]
}