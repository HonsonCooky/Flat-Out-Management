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
 * LOG LEVEL: Logged information will have some level of error.
 */
export enum LogLevel {
  INFO = "info",
  WARN = "warn",
  ERROR = "error"
}