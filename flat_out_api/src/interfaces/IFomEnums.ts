/**
 * Identifies all potential collections that clients can interact with. The specific outline of these
 * enums allows for dynamically finding MongoDB models, without creating extra unnecessary models (with spelling
 * errors).
 */
export enum ModelType {
  USER = 'user',
  GROUP = 'group',
  TABLE = 'table',
}

/**
 * Identifies levels of user authorization.
 */
export enum RoleType {
  OWNER = 'owner',
  WRITER = 'writer',
  READER = 'reader',
  REQUEST = 'request',
  MENTIONED = 'mentioned'
}

/**
 * Identifies how events are related to the user
 */
export enum EventType {
  USER = 'user',
  GROUP = 'group',
  MENTIONED = 'mentioned',
}

/**
 * Identifies how often some update must occur.
 */
export enum TimeIntervals {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  ANNUALLY = 'annually'
}

/**
 * Logged information will have some level of error.
 */
export enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}