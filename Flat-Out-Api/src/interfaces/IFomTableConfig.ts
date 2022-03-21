import {TimeIntervalEnum, WeekDays} from "./FomEnums";

export interface IFomTableConfigField {
  column: string
  nextUpdate: Date
}

export interface IFomTableRotation extends IFomTableConfigField {
  intervalUnit: TimeIntervalEnum
  intervalValue: number,
  intervalPOR?: WeekDays
}

export interface IFomTableConfig {
  rotations: IFomTableRotation[]
}