export enum ModelEnum {
  User = 'user',
  Group = 'group',
  Table = 'table'
}

/**
 * ROLE ENUM: Identifies levels of user authorization.
 */
export enum RoleEnum {
  ADMIN = 'admin',
  FLATMATE = 'flatmate',
  ASSOCIATE = 'associate',
  UNDEFINED = 'undefined'
}

/**
 * LOG LEVEL: Logged information will have some level of error.
 */
export enum LogLevel {
  info = "INFO",
  warn = "WARN",
  error = "ERROR"
}