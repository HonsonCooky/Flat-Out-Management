import {ITableConfigField} from "../../interfaces/IFomTableConfig";

export function getRulesToApply(rules: ITableConfigField[]): ITableConfigField[] {
  let today = Date.now()
  return rules.filter((rule: ITableConfigField) => (today - rule.nextUpdate.getTime()) <= 0)
}