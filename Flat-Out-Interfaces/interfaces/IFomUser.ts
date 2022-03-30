import {IFomController} from "./IFomController";
import {IFomEvent} from "./IFomEvent";

export interface IFomUser extends IFomController {
  outOfFlatDates: IFomEvent[]
}