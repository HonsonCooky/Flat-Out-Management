import {IFomComponent} from "./IFomComponent";
import {IFomEvent} from "./IFomEvent";

/**
 * A group document
 */
export interface IFomGroup extends IFomComponent {
  groupCalendar: IFomEvent[],
}