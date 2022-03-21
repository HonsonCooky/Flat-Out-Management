import {IFomTableConfigField, IFomTableRotation} from "../interfaces/IFomTableConfig";
import {IFomTable} from "../interfaces/IFomTable"
import {TimeIntervalEnum} from "../interfaces/FomEnums";


export function getRulesToApply(rules: IFomTableConfigField[]): IFomTableConfigField[] {
  let today = Date.now()
  return rules.filter((rule: IFomTableConfigField) => (today - rule.nextUpdate.getTime()) <= 0)
}

export function tableRotation(table: IFomTable): IFomTable {
  let rules = getRulesToApply(table.config.rotations)
  return table
}

export function calculateNextUpdate(field: IFomTableRotation): Date {
  if (Date.now() - field.nextUpdate.getTime() < 0) return field.nextUpdate

  let lastUpdate = field.nextUpdate
  let nextUpdate = new Date()

  // Zero out the date
  nextUpdate.setHours(0,0,0,0)

  switch (field.intervalUnit){
    case TimeIntervalEnum.DAILY:
      nextUpdate.setDate(lastUpdate.getDate() + field.intervalValue)
      break
    case TimeIntervalEnum.WEEKLY:
      nextUpdate.setDate(lastUpdate.getDate() + (field.intervalValue * 7))
      break
    case TimeIntervalEnum.MONTHLY:
      nextUpdate.setMonth(lastUpdate.getMonth() + field.intervalValue)

      break
    case TimeIntervalEnum.ANNUALLY:
      nextUpdate.setFullYear(lastUpdate.getFullYear() + field.intervalValue)
  }



  return nextUpdate
}
