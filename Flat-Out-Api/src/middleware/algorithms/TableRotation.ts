import {ITable} from "../../schemas/documents/TableSchema";
import {getRulesToApply} from "./partials";
import {ITableRotation} from "../../interfaces/IFomTableConfig";

export function calculateNextUpdate(field: ITableRotation): Date {

  return new Date()
}

export function tableRotation(table: ITable): ITable {
  let rules = getRulesToApply(table.config.rotations)
  return table
}