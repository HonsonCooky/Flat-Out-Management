/**
 * MODEL ENUM: Identifies all potential collections that clients can interact with. The specific outline of these
 * enums allows for dynamically finding MongoDB models, without creating extra unnecessary models (with spelling errors).
 */
export enum ModelEnum {
  USER = 'user',
  GROUP = 'group',
  TABLE = 'table',
}

/**
 * ROLE ENUM: Identifies levels of user authorization.
 */
export enum RoleEnum {
  OWNER = 'owner',      // Authority to read/write/delete/alter associations
  WRITE = 'write',      // Authority to read/write
  READ = 'read',        // Authority to read
  REQUEST = 'request',  // Asking for some level of authority
  NULL = 'null'         // No role require
}

/**
 * TABLE FIELD ENUM: Identifies the different types of column contents for each cell
 */
export enum TableFieldEnum {
  STRING = 'string',
  ASSOCIATION = 'association',
  DATE = 'date'
}

/**
 * TIME INTERVAL UNITS: Identifies how often some update must occur.
 */
export enum TimeIntervalEnum {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  ANNUALLY = 'annually'
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
  INFO = "info",
  WARN = "warn",
  ERROR = "error"
}