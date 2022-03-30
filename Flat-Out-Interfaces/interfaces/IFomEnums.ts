/**
 * MODEL TYPE: Identifies all potential collections that clients can interact with. The specific outline of these
 * enums allows for dynamically finding MongoDB models, without creating extra unnecessary models (with spelling errors).
 */
export enum ModelType {
  USER = 'user',
  GROUP = 'group',
  TABLE = 'table',
}

/**
 * ROLE TYPE: Identifies levels of user authorization.
 */
export enum RoleType {
  OWNER,    // Authority to read/write/delete/alter associations
  WRITE,    // Authority to read/write
  READ,     // Authority to read
  REQUEST,  // Asking for some level of authority
  MENTIONED   // No role require
}

/**
 * EVENT TYPE: Identifies how events are related to the user
 */
export enum EventType {
  USER,
  GROUP,
  MENTIONED,
}

/**
 * TIME INTERVALS: Identifies how often some update must occur.
 */
export enum TimeIntervals {
  DAILY,
  WEEKLY,
  MONTHLY,
  ANNUALLY
}

/**
 * WEEK DAYS: An enum for weekdays based on JS date .getDays()
 */
export enum WeekDays {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
}

/**
 * LOG LEVEL: Logged information will have some level of error.
 */
export enum LogLevel {
  INFO,
  WARN,
  ERROR
}