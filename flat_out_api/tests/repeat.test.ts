import {RepeatCycle, TimeUnits} from "../src/interfaces/non-entities/repeat";

/** -----------------------------------------------------------------------------------------------------------
 * The REPEAT tests, test the Repeat class, and it's functionality.
 -----------------------------------------------------------------------------------------------------------*/

/**
 * DAYS getCyclesToDate: Test the getCyclesToDate function for different types of DAYS units.
 */
it.each([
  {
    title: 'End Of Cycle has not expired',
    unit: TimeUnits.DAYS, // Doesn't matter here
    unitDuration: 1, // Doesn't matter here
    endOfCycle: new Date(new Date().setSeconds(new Date().getSeconds() + 1)),
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