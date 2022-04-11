/**
 * TABLE ROTATIONS: For this table, evaluate every configuration and apply necessary table rotations
 * @param table
 */
import {IFomTable, IFomTableRotationConfig} from "../../interfaces/IFomTable";
import {TimeIntervals} from "../../interfaces/IFomEnums";

export function tableRotations(table: IFomTable) {
  for (let r of table.rotations) {
    let oldNext = r.nextUpdate ?? r.startDate
    let {newNext, jumps} = getNextAndJumps(r, oldNext)

    if (oldNext.getTime() === newNext.getTime()) return

    rotateColumn(r, table, jumps)
    r.nextUpdate = newNext;
  }
}

/**
 * GET NEXT: Calculate the next update time based on the configuration of the table rotation.
 * @param config
 * @param date
 * @param jumps
 */
function getNextAndJumps(config: IFomTableRotationConfig, date: Date, jumps: number = 0): { newNext: Date, jumps: number } {
  // Re-config to UTC
  let today = new Date()
  let newNext = new Date(date)


  let todayUTC = new Date(Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0, 0, 0, 0
  ))
  let newNextUTC = new Date(Date.UTC(
    newNext.getFullYear(),
    newNext.getMonth(),
    newNext.getDate(),
    0, 0, 0, 0
  ))

  // If the provided date is beyond today, return it
  if (todayUTC.getTime() < newNextUTC.getTime()) return {newNext: new Date(newNextUTC.setHours(0)), jumps}

  // Implement one cycle of an update. If the update is not
  let {intervalUnit, intervalValue} = config
  switch (intervalUnit) {
    // Day
    case TimeIntervals.DAILY:
      newNext.setDate(newNextUTC.getDate() + intervalValue)
      return getNextAndJumps(config, newNext, jumps + 1)
    // Week
    case TimeIntervals.WEEKLY:
      newNext.setDate(newNextUTC.getDate() + (7 * intervalValue))
      return getNextAndJumps(config, newNext, jumps + 1)
    // Month
    case TimeIntervals.MONTHLY:
      newNext.setMonth(newNextUTC.getMonth() + intervalValue)
      return getNextAndJumps(config, newNext, jumps + 1)
    // Year
    case TimeIntervals.ANNUALLY:
      newNext.setFullYear(newNextUTC.getFullYear() + intervalValue)
      return getNextAndJumps(config, newNext, jumps + 1)
  }
}


/**
 * ROTATE COLUMN: With the new update time, rotate this column such that it represents the most up-to-date state.
 * @param config
 * @param table
 * @param jumps
 */
function rotateColumn(config: IFomTableRotationConfig, table: IFomTable, jumps: number) {
  let col = config.column
  let recordLength = table.records.length
  jumps = jumps % (recordLength - table.fieldIndexes.length)
  let newTable = Array(recordLength)

  for (let i = 0; i < recordLength; i++) {
    newTable[i] = [...table.records[i]]
    if (table.fieldIndexes.includes(i)) continue

    let j = i - jumps
    j = j < 0 ? recordLength + j : j
    j = findNonField(j, recordLength, table.fieldIndexes)

    newTable[i][col] = table.records[j][col]
  }
  table.records = newTable
}

function findNonField(index: number, numOfEntries: number, indexes: number[]): number {
  if (!indexes.includes(index)) return index
  return findNonField(index - 1 < 0 ? numOfEntries - 1 : index - 1, numOfEntries, indexes)
}