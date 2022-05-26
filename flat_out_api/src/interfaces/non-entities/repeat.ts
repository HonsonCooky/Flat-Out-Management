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
 * A sub-document used to describe repeats/cycles for some document.
 */
export interface RepeatCycle {
  /**Determines the unit of time for this repeat. E.g. {@link TimeUnits.WEEKS}*/
  unit: TimeUnits,
  /**Determines the number of units for this repeat. 2 Weeks: unit = {@link TimeUnits.WEEKS} && unitDuration = 2*/
  unitDuration: number,
  /**Determines the end of the current cycle*/
  endOfCycle: Date,
  /**Pause the cycle. Functions will return default, zero, values*/
  pause: boolean,
}

/**
 * Instance of RepeatCycle, with relevant helper methods.
 * The fields SHOULD be private, except, this is simply a helper to aid with handling RepeatCycle interface.
 *
 * The interface is needed for the MongoDB backend. This implementation is needed to micromanage all instances of
 * RepeatCycle. The two helper functions COULD be made into functions outside this class, however, I like this pattern.
 */
export class RepeatCycleImpl implements RepeatCycle {
  /**Determines the unit of time for this repeat. E.g. {@link TimeUnits.WEEKS}*/
  unit: TimeUnits
  /**Determines the number of units for this repeat. 2 Weeks: unit = {@link TimeUnits.WEEKS} && unitDuration = 2*/
  unitDuration: number
  /**Determines the end of the current cycle*/
  endOfCycle: Date
  /**Pause the cycle. Functions will return default, zero, values*/
  pause: boolean
  /**A constant used for some calculations (number of milliseconds in one day)*/
  private readonly _oneDayMs = 1000 * 60 * 60 * 24;

  /**
   * Repeat is essentially a glorified timer. It has two main functions.
   * - getCyclesToDate: Returns the number of cycles that have past since {@link endOfCycle}.
   * - getUpcomingEndOfCycleDates: Returns an array of n length, with upcoming end of cycle dates.
   *
   * @param unit A {@link TimeUnits} enum, that identifies some time interval
   * @param unitDuration A number that represents how many {@link unit}s to each cycle
   * @param endOfCycle A cache which stores the date, which represents the end of the current cycle.
   */
  constructor(unit: TimeUnits, unitDuration: number, endOfCycle?: Date) {
    this.unit = unit;
    this.unitDuration = unitDuration;
    this.endOfCycle = new Date((endOfCycle ? endOfCycle : new Date()).setHours(0, 0, 0, 0))
    this.pause = false
  }

  /**
   * Get the current pause state of this repeat cycle.
   */
  get isPaused(): boolean {
    return this.pause;
  }

  /**
   * A wrapper function to enable the construction of a {@link RepeatCycle} from an unknown object source.
   * @param options - { unit: TimeUnits, unitDuration: number, endOfCycle?: Date }
   */
  static from(options: any): RepeatCycle {
    assert(options.unit && options.unitDuration)
    return new RepeatCycleImpl(options.unit, options.unitDuration, options.endOfCycle)
  }

  /**
   * Pause the repeat cycle.
   */
  pauseCycle() {
    this.pause = true;
  }

  /**
   * Unpause the repeat cycle.
   */
  unpauseCycle() {
    this.pause = false;
    this.setEndOfCycle(new Date())
  }

  /**
   * A filter for setting the cycle, zeroing out the hours
   * @param date
   */
  setEndOfCycle(date: Date) {
    this.endOfCycle = new Date(date.setHours(0, 0, 0, 0))
  }

  /**
   * Get the cycles that have occurred to the current date.
   * @param updateReferenceDate
   */
  getCyclesToDate(updateReferenceDate: boolean = true): number {
    if (this.isPaused) return 0

    let {cycles, endOfCycle} = this._getCycles(this.endOfCycle, new Date());
    if (updateReferenceDate) this.setEndOfCycle(endOfCycle)
    return cycles
  }

  /**
   * Get n amount of upcoming endOfCycle dates.
   * @param n
   */
  getUpcomingEndOfCycleDates(n: number): Date[] {
    if (this.isPaused) return [this.endOfCycle]

    let upcomingEndOfCycleDates: Date[] = []
    let expireDate = new Date(this.endOfCycle)
    let toDate = new Date(expireDate.setDate(expireDate.getDate() + 1))

    for (let i = 0; i < n; i++) {
      let {endOfCycle} = this._getCycles(expireDate, toDate)
      upcomingEndOfCycleDates.push(new Date(endOfCycle))

      expireDate = new Date(endOfCycle)
      toDate = new Date(endOfCycle)
    }

    return upcomingEndOfCycleDates
  }

  /**
   * A helper function for debugging. Date manipulation is difficult *sighs*
   */
  toString(): string {
    return `Repeat Cycle: ${this.unit} : ${this.unitDuration}\n End Of Current Cycle: ${this.endOfCycle}`
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
    switch (this.unit) {
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
        let days = Math.floor(timeDiffMs / (this._oneDayMs * this.unitDuration)) + 1
        return {
          cycles: days,
          endOfCycle: new Date(expire.setDate(expire.getDate() + (days * this.unitDuration)))
        }
      /*
       WEEK CALCULATION:
       Same as DAY CALCULATION, except we multiply the number of days by 7. Thus dividing by numberOfWeeksMs
       */
      case TimeUnits.WEEKS:
        let weeks = Math.floor(timeDiffMs / (this._oneDayMs * this.unitDuration * 7)) + 1
        return {
          cycles: weeks,
          endOfCycle: new Date(expire.setDate(expire.getDate() + (weeks * 7 * this.unitDuration)))
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
        months = Math.floor(months / this.unitDuration) + 1
        return {
          cycles: months,
          endOfCycle: new Date(expire.setMonth(expire.getMonth() + (months * this.unitDuration)))
        }
      /*
       ANNUAL CALCULATION:
       Same as MONTHS, except divided by 12 to account for months in a year.
       */
      case TimeUnits.YEARS:
        // Same month calculation (3 lines, not worth the extra function)
        let monthDiff = (to.getFullYear() - expire.getFullYear()) * 12
        monthDiff += to.getMonth() - expire.getMonth()
        monthDiff = Math.floor(monthDiff / this.unitDuration) + 1

        let years = Math.ceil(monthDiff / 12)
        return {
          cycles: years,
          endOfCycle: new Date(expire.setMonth(expire.getMonth() + (years * 12 * this.unitDuration)))
        }
    }

    throw new Error('500: Unable to correctly calculate cycles')
  }
}