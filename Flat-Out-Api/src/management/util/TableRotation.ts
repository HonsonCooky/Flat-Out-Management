import {TimeIntervals, WeekDays, IFomTableRotation} from "flat-out-interfaces";

/**
 * GET NEXT WEEK DAY: From the current date, find the next viable
 * @param date
 * @param weekday
 */
function getNextWeekday(date: Date, weekday: WeekDays) {
  return date.getUTCDate() + (weekday - 1 - date.getUTCDay() + 7) % 7 + 1
}

/**
 * CALCULATE NEXT UPDATE: Find the next date and time when the table requires an automatic update
 * @param field
 */
export function calculateNextUpdate(field: IFomTableRotation): Date {
  // If the table does not need to update
  if (!field.update) throw new Error('500: Table field requires no update')

  // If the next update is not now
  let lastUpdate: Date = field.update.next ?? new Date()
  if ((Date.now() - lastUpdate.getTime()) < 0) return lastUpdate

  let nextUpdate: Date = new Date()

  // Zero out the date
  nextUpdate.setUTCHours(0, 0, 0, 0)

  switch (field.intervalUnit) {
    case TimeIntervals.DAILY:
      nextUpdate.setUTCDate(lastUpdate.getUTCDate() + field.intervalValue)
      break
    case TimeIntervals.WEEKLY:
      nextUpdate.setUTCDate(lastUpdate.getUTCDate() + (field.intervalValue * 7))
      break
    case TimeIntervals.MONTHLY:
      nextUpdate.setUTCMonth(lastUpdate.getUTCMonth() + field.intervalValue)
      if (field.intervalPOR) nextUpdate.setDate(getNextWeekday(nextUpdate, field.intervalPOR))
      break
    case TimeIntervals.ANNUALLY:
      nextUpdate.setUTCFullYear(lastUpdate.getUTCFullYear() + field.intervalValue)
      if (field.intervalPOR) nextUpdate.setUTCDate(getNextWeekday(nextUpdate, field.intervalPOR))
      break
  }
  field.update.next = nextUpdate

  return calculateNextUpdate(field)
}
