import {ITable} from "../../schemas/documents/TableSchema";
import {IFomTableConfigField, IFomTableRotation} from "../../interfaces/IFomTableConfig";


export function getRulesToApply(rules: IFomTableConfigField[]): IFomTableConfigField[] {
  let today = Date.now()
  return rules.filter((rule: IFomTableConfigField) => (today - rule.nextUpdate.getTime()) <= 0)
}

export function calculateNextUpdate(field: IFomTableRotation): Date {

  return new Date()
}

export function tableRotation(table: ITable): ITable {
  let rules = getRulesToApply(table.config.rotations)
  return table
}