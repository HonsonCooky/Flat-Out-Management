import {IFomController} from "./IFomController";
import {IFomEvent} from "./IFomEvent";

/**
 * A user document
 */
export interface IFomUser extends IFomController {
  outOfFlatDates: IFomEvent[]
  colorAssociation: string,
}