import {IFomComponent} from "./IFomComponent";
import {TimeIntervals, WeekDays} from "./IFomEnums";
import {IFomAssociation} from "./IFomAssociation";

export type IFomTableCell = { value: string | IFomAssociation | Date}
export type IFomTableRecord = { cells: IFomTableCell[], rowNumber: number }

export interface IFomTableRotation {
  column: string
  update?: {
    next?: Date,
    start?: Date,
  }
  intervalUnit: TimeIntervals
  intervalValue: number,
  intervalPOR?: WeekDays
}

export interface IFomTable extends IFomComponent {
  records: IFomTableRecord[],
  fieldIndexes: number[]
  rotationConfigs: IFomTableRotation[],
}
