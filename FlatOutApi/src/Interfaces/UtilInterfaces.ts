/**
 * MODEL TYPE: Used to reference documents
 */
import {User} from "./UserInterface";
import {Group} from "./GroupInterface";
import {Item, List} from "./ListInterface";

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
 * REQUEST EXTRACTIONS: Authentication result, the object outline being parsed back from authGetDocuments
 */

// An object which can be any other document type (aside from User and Group).
export type Other = List | Item

export type RequestExtractions = {
  user?: User,
  group?: Group,
  other?: Other,
}

/**
 * AUTHENTICATION: The contract for some authentication request from client.
 */
export type Authentication = {
  identifier: string,
  secret?: string,
}

/**
 * FOMREQ: Flat Out Management Request, outlines the contract that some request to the API must adhere to.
 */
export type FOMReq = {
  userAuth?: Authentication,
  groupAuth?: Authentication
  content?: any
}

/**
 * FOMRES: Flat Out Management Result, outlines the contract that the API will adhere to, sending anything back to
 * the client.
 */
export type FOMRes = {
  item?: any,
  msg: string
}
