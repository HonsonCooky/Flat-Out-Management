/**
 * For a given table, evaluate every configuration and apply necessary table rotations to the table.
 * @param table
 */
import {IFomTable, IFomTableRotationConfig} from "../../interfaces/IFomTable";
import {TimeIntervals} from "../../interfaces/IFomEnums";

export function tableRotations(table: IFomTable) {
  for (let r of table.rotations) {
    let oldNext = r.nextUpdate ?? r.startDate
    let {updateDate, jumps} = getUpdatedDateAndJumps(r, oldNext)

    if (oldNext.getTime() === updateDate.getTime()) return

    rotateColumn(r, table, jumps)
    r.nextUpdate = updateDate;
  }
}

/**
 * This method determines if the amount of time passed since Rotation.nextUpdate is sufficient for the table to rotate.
 * It does this by calculating the number of rotations ("jumps") between the two dates, based on the configuration.
 *
 * For example, if a configuration is set up to rotate every two weeks, and there is a five-week difference between
 * Rotation.nextUpdate and now, then:
 * - We are guaranteed one rotation for simply exceeding the 'nextUpdate' time.
 * - We need to calculate how many rotations have been since the last update
 * - We need to calculate when the next update will be
 * @param config
 * @param updateDate
 */
function getUpdatedDateAndJumps(config: IFomTableRotationConfig, updateDate: Date):
  { updateDate: Date, jumps: number } {

  let now = new Date()

  // If RIGHT NOW is not yet beyond the date of the next update, then don't make any changes.
  if (now.getTime() < updateDate.getTime()) return {updateDate, jumps: 0}

  let {intervalUnit, intervalValue} = config

  let timeDiff = now.getTime() - updateDate.getTime()
  let oneDayInMs = 1000 * 60 * 60 * 24
  let jumps = 0
  switch (intervalUnit) {
    /*
     DAYS: The rotation happens every X DAYS
     intervalValue = number of days
     timeDiff = amount
     */
    case TimeIntervals.DAILY:
      // Floor, such that the time is guaranteed to expire
      jumps = Math.floor(timeDiff / (oneDayInMs * intervalValue))
      if (jumps <= 0) break

      updateDate.setDate(updateDate.getDate() + (jumps * intervalValue))
      return {updateDate, jumps}
    /*
     */
    case TimeIntervals.WEEKLY:
      jumps = Math.floor(timeDiff / (oneDayInMs * 7 * intervalValue))
      if (jumps <= 0) break
      updateDate.setDate(updateDate.getDate() + (jumps * intervalValue))
      return {updateDate, jumps}
    // MONTHS
    case TimeIntervals.MONTHLY:
      jumps = (updateDate.getFullYear() - now.getFullYear()) * 12;
      jumps += updateDate.getMonth() - now.getMonth();
      jumps = jumps <= 0 ? 0 : jumps; // Number of months

      if (jumps <= 0) break

      jumps = jumps / intervalValue // Number of month interval
      updateDate.setMonth(updateDate.getMonth() + (jumps * intervalValue))
      return {updateDate, jumps}
    // YEARS
    case TimeIntervals.ANNUALLY:
  }

  return {updateDate, jumps: 0}
}


/**
 * With the new update time, rotate this column such that it represents the most up-to-date state.
 * @param config
 * @param table
 * @param jumps
 */
function rotateColumn(config: IFomTableRotationConfig, table: IFomTable, jumps: number) {
  // TODO
}

/**
 * A table can be configured with many headers. In order to avoid rotating on a header, find the next NON FIELD
 * (header).
 * @param index
 * @param numOfEntries
 * @param indexes
 */
function findNonField(index: number, numOfEntries: number, indexes: number[]): number {
  if (!indexes.includes(index)) return index
  return findNonField(index - 1 < 0 ? numOfEntries - 1 : index - 1, numOfEntries, indexes)
}