import {IFomTableConfigField, IFomTableRotation} from "../../../Flat-Out-Interfaces/interfaces/IFomTableConfig";
import {IFomTable} from "../../../Flat-Out-Interfaces/interfaces/IFomTable"


export function getRulesToApply(rules: IFomTableConfigField[]): IFomTableConfigField[] {
  let today = Date.now()
  return rules.filter((rule: IFomTableConfigField) => (today - rule.nextUpdate.getTime()) <= 0)
}

export function calculateNextUpdate(field: IFomTableRotation): Date {

  return new Date()
}

export function tableRotation(table: IFomTable): IFomTable {
  let rules = getRulesToApply(table.config.rotations)
  return table
}