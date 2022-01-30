/**
 * MODEL TYPE: Used to reference documents
 */
export enum ModelType {
  Users = 'Users',
  Groups = 'Groups',
  Lists = 'Lists'
}

/**
 * ROLE ENUM: Identifies levels of user authorization.
 */
export enum RoleEnum {
  ADMIN = 'admin',
  FLATMATE = 'flatmate',
  ASSOCIATE = 'associate',
  JOIN_REQ = 'join_request'
}

/**
 * AUTH RES: Authentication result, the object outline being parsed back from authGetDocuments
 */
export type AuthRes = {
  user: any,
  group: any,
  other: any,
}

/**
 * AUTHENTICATION: The contract for some authentication request from client.
 */
export type Authentication = {
  identifier: string,
  secret: string,
}

/**
 * FOMREQ: Flat Out Management Request, outlines the contract that some request to the API must adhere to.
 */
export type FOMReq = {
  userAuth: Authentication,
  groupAuth: Authentication
  content: any
}

/**
 * FOMRES: Flat Out Management Result, outlines the contract that the API will adhere to, sending anything back to
 * the client.
 */
export type FOMRes = {
  item?: any,
  msg: string
}
