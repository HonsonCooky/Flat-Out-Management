import {ITable} from "../schemas/documents/TableSchema";

function tableRequiresRotation(table: ITable): boolean {
  return false
}

export function tableRotation(table: ITable): ITable {
  if (!tableRequiresRotation(table)) return table

  return table
}