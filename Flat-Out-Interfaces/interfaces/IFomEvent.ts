import {EventType} from "./IFomEnums";

export interface IFomEvent {
  date: Date,
  type: EventType,
  title: string,
  message: string,
}