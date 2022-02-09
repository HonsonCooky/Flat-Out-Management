export enum ModelEnum {
  Users = 'Users',
  Groups = 'Groups',
  Lists = 'Lists',
  Tables = 'Tables'
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