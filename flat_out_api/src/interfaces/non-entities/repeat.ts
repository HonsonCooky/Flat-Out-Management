import assert from "assert";


/**
 * A constant that outlines different time units (only those relevant for FOM)
 */
export enum TimeUnits {
  DAYS = 'days',
  WEEKS = 'weeks',
  MONTHS = 'months',
  YEARS = 'years'
}

/**
 * Repeat object. See constructor
 */
export class RepeatCycle {
  /**Determines the end of the current cycle*/
  private _endOfCycle: Date
  /**Determines the unit of time for this repeat. E.g. {@link TimeUnits.WEEKS}*/
  private readonly _unit: TimeUnits
  /**Determines the number of units for this repeat. 2 Weeks: unit = {@link TimeUnits.WEEKS} && unitDuration = 2*/
  private readonly _unitDuration: number
  /**A constant used for some calculations (number of milliseconds in one day)*/
  private readonly _oneDayMs = 1000 * 60 * 60 * 24;

  /**
   * Repeat is essentially a glorified timer. It has two main functions.
   *  1) Determine how many
   *  2) Create a list of dates
   *
   * @param options An object which contains a unit: {@link TimeUnits}, unitDurations: number, and maybe a
   *   referenceDate (defaults to Date.now)
   */
  constructor(options: { unit: TimeUnits, unitDuration: number, endOfCycle?: Date }) {
    assert(options.unit && options.unitDuration)
    this._unit = options.unit;
    this._unitDuration = options.unitDuration;
    this._endOfCycle = options.endOfCycle ?
                       new Date(options.endOfCycle.setHours(0, 0, 0, 0)) :
                       new Date(new Date().setHours(0, 0, 0, 0))
  }

  /**
   * Update the endOfCycle date manually.
   * @param date
   */
  set endOfCycle(date: Date) {
    this._endOfCycle = new Date(date.setHours(0, 0, 0, 0));
  }


  get endOfCycle(): Date {
    return new Date(this._endOfCycle);
  }

  /**
   * Get the cycles that have occurred to the current date.
   * @param updateReferenceDate
   */
  getCyclesToDate(updateReferenceDate: boolean = true): number {
    let {cycles, endOfCycle} = this._getCycles(this.endOfCycle, new Date());
    if (updateReferenceDate) this._endOfCycle = endOfCycle
    return cycles
  }

  /**
   * Get n amount of upcoming endOfCycle dates.
   * @param n
   */
  getUpcomingEndOfCycleDates(n: number): Date[] {
    let upcomingEndOfCycleDates: Date[] = []
    let expireDate = this.endOfCycle
    let toDate = new Date(this.endOfCycle.setHours(this.endOfCycle.getHours() + 1))

    for (let i = 0; i < n; i++) {
      let {endOfCycle} = this._getCycles(expireDate, toDate)
      upcomingEndOfCycleDates.push(endOfCycle)

      expireDate = new Date(endOfCycle.setHours(0, 0, 0, 0))
      toDate = new Date(expireDate.setHours(expireDate.getHours() + 1))
    }

    return upcomingEndOfCycleDates
  }

  /**
   * Calculates the number of cycles that have occurred to the given {@link to} from the given {@link endOfCycle}
   * (inclusive). Completing a cycle is simply exceeding the {@link endOfCycle} date.
   *
   * @param expire
   * @param to
   * @return {cycles: number, endOfCycle: Date} Where the cycles is the number of cycles from 'from', to 'to'. And
   * endOfCycle is the date that it lands on.
   */
  private _getCycles(expire: Date, to: Date): { cycles: number, endOfCycle: Date } {
    // If we have yet to surpass the endOfCycle date, then no cycles have passed
    if (expire.getTime() > to.getTime()) return {cycles: 0, endOfCycle: expire}

    let timeDiffMs = to.getTime() - expire.getTime()
    switch (this._unit) {
      /*
       DAY CALCULATION:
       - (oneDayMs * duration) = numberOfDaysMs
       - timeDiffMs / numberOfDaysMs = numberOfDaysDiff
       - Math.floor, then add one to bump into current cycle

       Little confusing, but consider these examples

       E.g 1 (Slightly more time, same day)
       ref      = 1653436800000   (Thu, 26 May 2022 00:00:00 GMT)
       today    = 1653523250000   (Thu, 26 May 2022 00:00:50 GMT)
       diff     = 86450000        (slightly more than one day)
       jumps    = Math.floor(86450000/86400000) + 1 === 1
       _endOfCycle = 27/05/22

       E.g 2 (Different day and time ahead)
       ref      = 1653436800000   (Wed, 25 May 2022 00:00:00 GMT)
       today    = 1653823800000   (Sun, 29 May 2022 11:30:00 GM)
       diff     = 387000000
       jumps    = Math.floor(387000000/86400000) + 1 === 5
       _endOfCycle = 30/05/22

       */
      case TimeUnits.DAYS:
        let days = Math.floor(timeDiffMs / (this._oneDayMs * this._unitDuration)) + 1
        return {
          cycles: days,
          endOfCycle: new Date(expire.setDate(expire.getDate() + (days * this._unitDuration)))
        }
      /*
       WEEK CALCULATION:
       Same as DAY CALCULATION, except we multiply the number of days by 7. Thus dividing by numberOfWeeksMs
       */
      case TimeUnits.WEEKS:
        let weeks = Math.floor(timeDiffMs / (this._oneDayMs * this._unitDuration * 7)) + 1
        return {
          cycles: weeks,
          endOfCycle: new Date(expire.setDate(expire.getDate() + (weeks * 7 * this._unitDuration)))
        }
      /*
       MONTH CALCULATION: (Little tricky)
       - First, take the difference in years * 12 (allows for Dec -> Feb calculations)
       - Minus the number of months from reference date.
       - Add the number of months from today's date.
       - Add one to bump into current cycle

       Visualization: DD/MM/YY
       ref       = 01/08/22
       today     = 01/02/23
       yearDiff  = (23 - 22) * 12  === 12
       minus     = 12 - 8          === 4
       add       = 10 + 2          === 6
       add one   = 6 + 1           === 7
       6 months difference between 01/08/22 && 01/02/23, thus we are in the 7th cycle, with an end of cycle date
       01/03/23.

       */
      case TimeUnits.MONTHS:
        let months = (to.getFullYear() - expire.getFullYear()) * 12
        months += to.getMonth() - expire.getMonth()
        months = Math.floor(months / this._unitDuration) + 1
        return {
          cycles: months,
          endOfCycle: new Date(expire.setMonth(expire.getMonth() + (months * this._unitDuration)))
        }
      /*
       ANNUAL CALCULATION:
       Simply calculate the yearly difference, and add one for the current cycle, right?

       Consider this:
       ref     = 01/08/22
       today   = 17/07/23
       So the difference is one year, plus one means that our _endOfCycle will change to 01/08/24 (which is wrong).
       The next _endOfCycle should be 01/08/24

       So, don't add the one at the end... okay then, so the works for the above, but...

       Consider this:
       ref    = 01/02/22
       today  = 17/07/22
       Here, we don't add the one, and get a yearly difference of 0, so the _endOfCycle will be 01/02/22 (which is
       wrong). We need the update.

       So instead, we can do a monthly one, but just divide the number of months by 12, and Math.ceil that number?

       E.g. 1 (Next year)
       ref      = 01/08/22
       today    = 17/07/23
       diff     = Math.ceil(11 / 12) === 1 (correct)

       E.g. 2 (This year)
       ref      = 01/02/22
       today    = 17/07/22
       diff     = Math.ceil(5 / 12) === 1 (correct)

       E.g. 3 (More than one, but less than 2, years)
       ref      = 01/02/22
       today    = 17/07/23
       diff     = Math.ceil(17 / 12) === 2 (correct)

       */
      case TimeUnits.YEARS:
        // Same month calculation (3 lines, not worth the extra function)
        let monthDiff = (to.getFullYear() - expire.getFullYear()) * 12
        monthDiff += to.getMonth() - expire.getMonth()
        monthDiff = Math.floor(monthDiff / this._unitDuration) + 1

        let years = Math.ceil(monthDiff / 12)
        return {
          cycles: years,
          endOfCycle: new Date(expire.setMonth(expire.getMonth() + (years * 12 * this._unitDuration)))
        }
    }

    throw new Error('500: Unable to correctly calculate cycles')
  }

  /**
   * A helper function for debugging. Date manipulation is difficult *sighs*
   */
  toString(): string {
    return `Repeat Cycle: ${this._unit} : ${this._unitDuration}\n End Of Current Cycle: ${this._endOfCycle}`
  }
}