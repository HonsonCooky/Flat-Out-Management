import {IFomComponent} from "./IFomComponent";
import {IFomEvent} from "./IFomEvent";

/**
 * GROUP: A group document
 */
export interface IFomGroup extends IFomComponent {
  groupCalendar: IFomEvent[],
}