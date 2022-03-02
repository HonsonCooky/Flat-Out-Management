/**
 * MODEL ENUM: Identifies all potential collections that clients can interact with. The specific outline of these
 * enums allows for dynamically finding MongoDB models, without creating extra unnecessary models (with spelling errors).
 */
export enum ModelEnum {
  USER = 'user',
  GROUP = 'group',
  TABLE = 'table',
  STORAGE = 'storage'
}

/**
 * ROLE ENUM: Identifies levels of user authorization.
 */
export enum RoleEnum {
  ADMIN = 'admin',
  FLATMATE = 'flatmate',
  ASSOCIATE = 'associate',
  JOIN_REQUEST = 'joinRequest',
  NULL = 'null'
}

/**
 * LOG LEVEL: Logged information will have some level of error.
 */
export enum LogLevel {
  INFO = "info",
  WARN = "warn",
  ERROR = "error"
}