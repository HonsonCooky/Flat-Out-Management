import {RepeatCycleImpl, TimeUnits} from "../../src/interfaces/non-entities/repeat";
import {AssertionError} from "assert";

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
    let repeatCycle = new RepeatCycleImpl(
      unit,
      unitDuration,
      endOfCycle,
    )

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
    dateMultiplier: 1,
  },
  {
    title: '3 day cycle - n 5',
    unit: TimeUnits.DAYS,
    unitDuration: 3,
    endOfCycle: new Date(),
    n: 5,
    dateMultiplier: 3,
  },
  {
    title: '1 week cycle - n 5',
    unit: TimeUnits.WEEKS,
    unitDuration: 1,
    endOfCycle: new Date(),
    n: 5,
    dateMultiplier: 7,
  },
  {
    title: '3 week cycle - n 5',
    unit: TimeUnits.WEEKS,
    unitDuration: 3,
    endOfCycle: new Date(),
    n: 5,
    dateMultiplier: (7 * 3)
  },
  {
    title: '1 month cycle - n 5',
    unit: TimeUnits.MONTHS,
    unitDuration: 1,
    endOfCycle: new Date(),
    n: 5,
    dateMultiplier: 1
  },
  {
    title: '3 month cycle - n 5',
    unit: TimeUnits.MONTHS,
    unitDuration: 3,
    endOfCycle: new Date(),
    n: 5,
    dateMultiplier: 3
  },
  {
    title: '1 year cycle - n 5',
    unit: TimeUnits.YEARS,
    unitDuration: 1,
    endOfCycle: new Date(),
    n: 5,
    dateMultiplier: 12
  },
  {
    title: '3 year cycle - n 5',
    unit: TimeUnits.YEARS,
    unitDuration: 3,
    endOfCycle: new Date(),
    n: 5,
    dateMultiplier: (12 * 3)
  },
])('Repeat.getUpcomingEndOfCycleDates - $unit - $title', ({unit, unitDuration, endOfCycle, n, dateMultiplier}) => {
  let repeatCycle = new RepeatCycleImpl(
    unit,
    unitDuration,
    endOfCycle
  )
  let today = new Date(endOfCycle)
  let expectedDates: Date[] = []
  for (let i = 0; i < n; i++) {
    switch (unit) {
      case TimeUnits.DAYS:
        today = new Date(today.setDate(today.getDate() + dateMultiplier))
        break;
      case TimeUnits.WEEKS:
        today = new Date(today.setDate(today.getDate() + dateMultiplier))
        break;
      case TimeUnits.MONTHS:
        today = new Date(today.setMonth(today.getMonth() + dateMultiplier))
        break;
      case TimeUnits.YEARS:
        today = new Date(today.setMonth(today.getMonth() + dateMultiplier))
        break;
    }
    expectedDates.push(new Date(today))
  }
  let dates = repeatCycle.getUpcomingEndOfCycleDates(n)
  expect(dates.length).toBe(n)
  expect(dates).toStrictEqual(expectedDates)
})

it('Repeat set getUpcomingEndOfCycleDates example', () => {
  let cycle = new RepeatCycleImpl(TimeUnits.DAYS, 3, new Date('2022-05-14T00:00:00'))
  let future = cycle.getUpcomingEndOfCycleDates(1)[0]

  expect(future.getTime()).toBe(new Date('2022-05-17T00:00:00').getTime())
})

it('Repeat.from VALID', () => {
  expect(RepeatCycleImpl.from({
    unit: TimeUnits.DAYS,
    unitDuration: 1,
    endOfCycle: new Date('2022-05-01')
  })).toStrictEqual(new RepeatCycleImpl(
    TimeUnits.DAYS,
    1,
    new Date('2022-05-01')
  ))
})

it('Repeat.from INVALID', () => {
  expect(() => RepeatCycleImpl.from({})).toThrow(AssertionError)
  expect(() => RepeatCycleImpl.from({unit: TimeUnits.DAYS})).toThrow(AssertionError)
  expect(() => RepeatCycleImpl.from({unitDuration: 1})).toThrow(AssertionError)
  expect(() => RepeatCycleImpl.from({endOfCycle: new Date()})).toThrow(AssertionError)
})

it('Repeat.pauseCycle', () => {
  let repeatCycle = new RepeatCycleImpl(TimeUnits.DAYS, 1, new Date(new Date().setDate(new Date().getDate() - 1)))
  expect(repeatCycle.pause).toBe(false)
  expect(repeatCycle.getCyclesToDate(false)).toBe(2)

  repeatCycle.pauseCycle()
  expect(repeatCycle.pause).toBe(true)
  expect(repeatCycle.getCyclesToDate(false)).toBe(0)

  repeatCycle.unpauseCycle()
  expect(repeatCycle.pause).toBe(false)
  expect(repeatCycle.getCyclesToDate(false)).toBe(1)
})

it('Repeat.toString', () => {
  let repeatCycle = new RepeatCycleImpl(TimeUnits.DAYS, 1, new Date("2022-05-01T00:00:00"))
  expect(repeatCycle.toString()).toBe("Repeat Cycle: days : 1\n End Of Current Cycle: Sun May 01 2022 00:00:00" +
    " GMT+1200 (New Zealand Standard Time)"
  )
})