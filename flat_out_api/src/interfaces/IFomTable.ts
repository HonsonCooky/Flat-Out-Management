import {IFomComponent} from "./IFomComponent";
import {TimeIntervals} from "./IFomEnums";
import {IFomAssociation} from "./IFomAssociation";

/**
 * Outlines the different data values allowed in a table cell.
 */
export type IFomTableRecord = (string | IFomAssociation | Date)[]

/**
 * Outlines the necessary settings for a table rotation configuration
 */
export interface IFomTableRotationConfig {
  column: number
  startDate: Date
  nextUpdate?: Date
  intervalValue: number,
  intervalUnit: TimeIntervals
}

/**
 * A table document
 */
export interface IFomTable extends IFomComponent {
  columns: number,
  fieldIndexes: number[],
  records: IFomTableRecord[],
  rotations: IFomTableRotationConfig[],
}
