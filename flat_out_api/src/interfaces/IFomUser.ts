import {IFomController} from "./IFomController";
import {IFomEvent} from "./IFomEvent";

/**
 * A user document
 */
export interface IFomUser extends IFomController {
  calendar: IFomEvent[]
  color: string,
}