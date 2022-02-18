/**
 * MODEL ENUM: Identifies all potential collections that clients can interact with. The specific outline of these
 * enums allows for dynamically finding MongoDB models, without creating extra unnecessary models (with spelling errors).
 */
export enum ModelEnum {
  USER = 'user',
  GROUP = 'group',
  TABLE = 'table'
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

/**
 * SEARCH OPERATOR: Associations are all lumped into one array for ease of deleting users and other functions. The
 * searchAssociations removes duplicate complexity from the core code base. When specifying the filtering parameters
 * of the search, some specifier needs to indicate whether the filters are || or && specifiers.
 */
export enum SearchOperator {
  AND,
  OR
}