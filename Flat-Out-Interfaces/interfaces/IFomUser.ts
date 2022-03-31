import {IFomController} from "./IFomController";
import {IFomEvent} from "./IFomEvent";

/**
 * USER: A user document
 */
export interface IFomUser extends IFomController {
  outOfFlatDates: IFomEvent[]
}