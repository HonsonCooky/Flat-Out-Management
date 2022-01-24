/**
 * Although this file contains both types and enums, all are used in one way or another to ensure that certain
 * features are included or kept consistent.
 */


/**
 * MODEL TYPE: Used to reference documents
 */
export enum ModelType {
  Users = 'Users',
  Groups = 'Groups',
  Lists = 'Lists'
}

/**
 * ROLE ENUM: Identifies the level of
 */
export enum RoleEnum {
  ADMIN = 'admin',
  FLATMATE = 'flatmate',
  ASSOCIATE = 'associate',
  JOIN_REQ = 'join_request'
}


export type AuthGetRes = {
  user: any,
  group: any,
  other: any,
}

export type Authentication = {
  identifier: string,
  secret: string,
}

export type FOMReq = {
  userAuth: Authentication,
  groupAuth: Authentication
  content: any
}

export type FOMRes = {
  item?: any,
  msg: string
}
