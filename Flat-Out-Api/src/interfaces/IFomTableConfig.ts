import {SortByEnum, TimeIntervalEnum} from "./FomEnums";

interface TableConfigField {
  column: string,
  updatedAt: Date
}

export interface ITableRotation extends TableConfigField {
  intervalUnit: TimeIntervalEnum,
  intervalValue: number
}

export interface ITableSort {
  sortType: SortByEnum
}

export interface IFomTableConfig {
  rotations: ITableRotation[],
  order: ITableSort[]
}