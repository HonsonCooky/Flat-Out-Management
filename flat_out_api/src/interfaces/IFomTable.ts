import {IFomComponent} from "./IFomComponent";
import {TimeIntervals} from "./IFomEnums";
import {IFomAssociation} from "./IFomAssociation";
import {IFomEvent} from "./IFomEvent";

export type IFomCellCalculation = {
  codeStr: string
}

/**
 * Outlines the different data values allowed in a table cell.
 */
export type IFomTableRecord = (string | number | Date | IFomAssociation | IFomEvent | IFomCellCalculation)[]

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
  colLength: number,
  rowLength: number,
  fields: IFomTableRecord
  records: IFomTableRecord[],
  rotations: IFomTableRotationConfig[],
}
