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
  OWNER = 'owner',    // Authority to read/write/delete/alter associations
  WRITE = 'write',    // Authority to read/write
  READ = 'read',     // Authority to read
  REQUEST = 'request',  // Asking for some level of authority
  MENTIONED = 'mentioned'   // No role require
}

/**
 * EVENT TYPE: Identifies how events are related to the user
 */
export enum EventType {
  USER = 'user',
  GROUP = 'group',
  MENTIONED = 'mentioned',
}

/**
 * TIME INTERVALS: Identifies how often some update must occur.
 */
export enum TimeIntervals {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  ANNUALLY = 'annually'
}

/**
 * LOG LEVEL: Logged information will have some level of error.
 */
export enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}