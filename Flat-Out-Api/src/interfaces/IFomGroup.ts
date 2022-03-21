import {IFomComponent} from "./IFomComponent";
import {IFomEvent} from "./IFomEvent";

export interface IFomGroup extends IFomComponent {
  groupCalendar: IFomEvent[],
}