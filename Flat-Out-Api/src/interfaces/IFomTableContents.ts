import {IFomAssociation} from "./IFomAssociation";
import {TableFieldEnum} from "./FomEnums";

export type IFomTableField = { value: string, fieldType: TableFieldEnum, columnNumber: number }
export type IFomTableHeader = IFomTableField[]

export type IFomTableCell = { value: string | IFomAssociation | Date, field: string }
export type IFomTableRecord = { value: IFomTableCell[], rowNumber: number }