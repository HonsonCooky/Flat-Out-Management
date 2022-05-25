import {RepeatCycle, TimeUnits} from "../src/interfaces/non-entities/repeat";

/** -----------------------------------------------------------------------------------------------------------
 * The REPEAT tests, test the Repeat class, and it's functionality.
 -----------------------------------------------------------------------------------------------------------*/

/**
 * getCyclesToDate: Test the getCyclesToDate function for different types of units.
 */
it.each([
  {
    title: 'End Of Cycle has not expired',
    unit: TimeUnits.DAYS, // Doesn't matter here
    unitDuration: 1, // Doesn't matter here
    endOfCycle: new Date(new Date().setDate(new Date().getDate() + 1)),
    expectedCycles: 0
  },
  {
    title: '1 day cycle - expired now',
    unit: TimeUnits.DAYS,
    unitDuration: 1,
    endOfCycle: new Date(),
    expectedCycles: 1,
  },
  {
    title: '1 day cycle - expired 2 days ago',
    unit: TimeUnits.DAYS,
    unitDuration: 1,
    endOfCycle: new Date(new Date().setDate(new Date().getDate() - 2)),
    expectedCycles: 3,
  },
  {
    title: '3 day cycle - expired 2 days ago',
    unit: TimeUnits.DAYS,
    unitDuration: 3,
    endOfCycle: new Date(new Date().setDate(new Date().getDate() - 2)),
    expectedCycles: 1,
  },
  {
    title: '3 day cycle - expired 13 days ago',
    unit: TimeUnits.DAYS,
    unitDuration: 3,
    endOfCycle: new Date(new Date().setDate(new Date().getDate() - 13)),
    expectedCycles: 5,
  },
  {
    title: '1 week cycle - expired now',
    unit: TimeUnits.WEEKS,
    unitDuration: 1,
    endOfCycle: new Date(),
    expectedCycles: 1,
  },
  {
    title: '1 week cycle - expired 2 weeks ago',
    unit: TimeUnits.WEEKS,
    unitDuration: 1,
    endOfCycle: new Date(new Date().setDate(new Date().getDate() - 14)),
    expectedCycles: 3,
  },
  {
    title: '3 week cycle - expired 2 weeks ago',
    unit: TimeUnits.WEEKS,
    unitDuration: 3,
    endOfCycle: new Date(new Date().setDate(new Date().getDate() - 14)),
    expectedCycles: 1,
  },
  {
    title: '3 week cycle - expired 13 weeks ago',
    unit: TimeUnits.WEEKS,
    unitDuration: 3,
    endOfCycle: new Date(new Date().setDate(new Date().getDate() - (7 * 13))),
    expectedCycles: 5,
  },
  {
    title: '1 month cycle - expired now',
    unit: TimeUnits.MONTHS,
    unitDuration: 1,
    endOfCycle: new Date(),
    expectedCycles: 1,
  },
  {
    title: '1 month cycle - expired 2 months ago',
    unit: TimeUnits.MONTHS,
    unitDuration: 1,
    endOfCycle: new Date(new Date().setMonth(new Date().getMonth() - 2)),
    expectedCycles: 3,
  },
  {
    title: '3 month cycle - expired 2 months ago',
    unit: TimeUnits.MONTHS,
    unitDuration: 3,
    endOfCycle: new Date(new Date().setMonth(new Date().getMonth() - 2)),
    expectedCycles: 1,
  },
  {
    title: '3 month cycle - expired 13 months ago',
    unit: TimeUnits.MONTHS,
    unitDuration: 3,
    endOfCycle: new Date(new Date().setMonth(new Date().getMonth() - 13)),
    expectedCycles: 5,
  },
  {
    title: '1 year cycle - expired now',
    unit: TimeUnits.YEARS,
    unitDuration: 1,
    endOfCycle: new Date(),
    expectedCycles: 1,
  },
  {
    title: '1 year cycle - expired 2 years ago',
    unit: TimeUnits.YEARS,
    unitDuration: 1,
    endOfCycle: new Date(new Date().setMonth(new Date().getMonth() - (2 * 12))),
    expectedCycles: 3,
  },
  {
    title: '3 year cycle - expired 2 years ago',
    unit: TimeUnits.YEARS,
    unitDuration: 3,
    endOfCycle: new Date(new Date().setMonth(new Date().getMonth() - (2 * 12))),
    expectedCycles: 1,
  },
  {
    title: '3 year cycle - expired 13 years ago',
    unit: TimeUnits.YEARS,
    unitDuration: 3,
    endOfCycle: new Date(new Date().setMonth(new Date().getMonth() - (13 * 12))),
    expectedCycles: 5,
  },
])('Repeat.getCyclesToDate - $unit - $title',
  ({unit, unitDuration, endOfCycle, expectedCycles}) => {
    let repeatCycle = new RepeatCycle({
      unit,
      unitDuration,
      endOfCycle,
    })

    let cycles = repeatCycle.getCyclesToDate()
    expect(cycles).toBe(expectedCycles)
  })

/**
 * getUpcomingEndOfCycleDates: Test the getUpcomingEndOfCycleDates function for different types of units.
 */
it.each([
  {
    title: '1 day cycle - n 5',
    unit: TimeUnits.DAYS,
    unitDuration: 1,
    endOfCycle: new Date(),
    n: 5,
    expectedDates: [
      new Date(new Date().setDate(new Date().getDate() + 1)),
      new Date(new Date().setDate(new Date().getDate() + 2)),
      new Date(new Date().setDate(new Date().getDate() + 3)),
      new Date(new Date().setDate(new Date().getDate() + 4)),
      new Date(new Date().setDate(new Date().getDate() + 5)),
    ],
  },
  {
    title: '3 day cycle - n 5',
    unit: TimeUnits.DAYS,
    unitDuration: 3,
    endOfCycle: new Date(),
    n: 5,
    expectedDates: [
      new Date(new Date().setDate(new Date().getDate() + 3)),
      new Date(new Date().setDate(new Date().getDate() + (2 * 3))),
      new Date(new Date().setDate(new Date().getDate() + (3 * 3))),
      new Date(new Date().setDate(new Date().getDate() + (4 * 3))),
      new Date(new Date().setDate(new Date().getDate() + (5 * 3))),
    ],
  },
  {
    title: '1 week cycle - n 5',
    unit: TimeUnits.WEEKS,
    unitDuration: 1,
    endOfCycle: new Date(),
    n: 5,
    expectedDates: [
      new Date(new Date().setDate(new Date().getDate() + (7))),
      new Date(new Date().setDate(new Date().getDate() + (2 * 7))),
      new Date(new Date().setDate(new Date().getDate() + (3 * 7))),
      new Date(new Date().setDate(new Date().getDate() + (4 * 7))),
      new Date(new Date().setDate(new Date().getDate() + (5 * 7))),
    ],
  },
  {
    title: '3 week cycle - n 5',
    unit: TimeUnits.WEEKS,
    unitDuration: 3,
    endOfCycle: new Date(),
    n: 5,
    expectedDates: [
      new Date(new Date().setDate(new Date().getDate() + (7 * 3))),
      new Date(new Date().setDate(new Date().getDate() + (2 * 7 * 3))),
      new Date(new Date().setDate(new Date().getDate() + (3 * 7 * 3))),
      new Date(new Date().setDate(new Date().getDate() + (4 * 7 * 3))),
      new Date(new Date().setDate(new Date().getDate() + (5 * 7 * 3))),
    ],
  },
  {
    title: '1 month cycle - n 5',
    unit: TimeUnits.MONTHS,
    unitDuration: 1,
    endOfCycle: new Date(),
    n: 5,
    expectedDates: [
      new Date(new Date().setMonth(new Date().getMonth() + 1)),
      new Date(new Date().setMonth(new Date().getMonth() + 2)),
      new Date(new Date().setMonth(new Date().getMonth() + 3)),
      new Date(new Date().setMonth(new Date().getMonth() + 4)),
      new Date(new Date().setMonth(new Date().getMonth() + 5)),
    ],
  },
  {
    title: '3 month cycle - n 5',
    unit: TimeUnits.MONTHS,
    unitDuration: 3,
    endOfCycle: new Date(),
    n: 5,
    expectedDates: [
      new Date(new Date().setMonth(new Date().getMonth() + 3)),
      new Date(new Date().setMonth(new Date().getMonth() + (2 * 3))),
      new Date(new Date().setMonth(new Date().getMonth() + (3 * 3))),
      new Date(new Date().setMonth(new Date().getMonth() + (4 * 3))),
      new Date(new Date().setMonth(new Date().getMonth() + (5 * 3))),
    ],
  },
  {
    title: '1 year cycle - n 5',
    unit: TimeUnits.YEARS,
    unitDuration: 1,
    endOfCycle: new Date(),
    n: 5,
    expectedDates: [
      new Date(new Date().setMonth(new Date().getMonth() + 12)),
      new Date(new Date().setMonth(new Date().getMonth() + (2 * 12))),
      new Date(new Date().setMonth(new Date().getMonth() + (3 * 12))),
      new Date(new Date().setMonth(new Date().getMonth() + (4 * 12))),
      new Date(new Date().setMonth(new Date().getMonth() + (5 * 12))),
    ],
  },
  {
    title: '3 year cycle - n 5',
    unit: TimeUnits.YEARS,
    unitDuration: 3,
    endOfCycle: new Date(),
    n: 5,
    expectedDates: [
      new Date(new Date().setMonth(new Date().getMonth() + (12 * 3))),
      new Date(new Date().setMonth(new Date().getMonth() + (2 * 12 * 3))),
      new Date(new Date().setMonth(new Date().getMonth() + (3 * 12 * 3))),
      new Date(new Date().setMonth(new Date().getMonth() + (4 * 12 * 3))),
      new Date(new Date().setMonth(new Date().getMonth() + (5 * 12 * 3))),
    ],
  },
])('Repeat.getUpcomingEndOfCycleDates - $unit - $title', ({unit, unitDuration, endOfCycle, n, expectedDates}) => {
  let repeatCycle = new RepeatCycle({
    unit,
    unitDuration,
    endOfCycle,
  })

  let dates = repeatCycle.getUpcomingEndOfCycleDates(n)
  dates = dates.map((date: Date) => new Date(new Date(date).setUTCHours(0, 0, 0, 0)))
  expectedDates = expectedDates.map((date: Date) => new Date(new Date(date).setUTCHours(0, 0, 0, 0)))
  expect(dates).toStrictEqual(expectedDates)
})

/**
 * UTILITY FUNCTIONS
 */
it('Repeat.toString', () => {
  let repeatCycle = new RepeatCycle({unit: TimeUnits.DAYS, unitDuration: 1})
  repeatCycle.endOfCycle = new Date()
  expect(repeatCycle.toString()).toBe(
    `Repeat Cycle: days : 1\n End Of Current Cycle: ${new Date(
      new Date().setHours(0, 0, 0, 0))}`)
})