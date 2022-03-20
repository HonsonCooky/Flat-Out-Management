import {TimeIntervalEnum} from "./FomEnums";

export interface ITableConfigField {
  column: string
}

export interface ITableRotation extends ITableConfigField {
  intervalUnit: TimeIntervalEnum
  intervalValue: number
  nextUpdate: Date
}

export interface IFomTableConfig {
  rotations: ITableRotation[]
}