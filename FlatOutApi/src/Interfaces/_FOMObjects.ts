import {Authentication, EntityRoleAndRef} from "./_Utils";

/**
 * BASE: Outlines the base features for every document in the Flat Out Management DB.
 */
export interface Named {
  name: string
}

/**
 * LINKED: An extension to the base document, this document also has associations to other documents.
 */
export interface Linked {
  associations: EntityRoleAndRef[]
}

/**
 * TIME STAMPED: An extension to the base document, this document also has createdAt, and updatedAt information.
 */
export interface TimeStamped {
  createdAt: Date,
  updatedAt: Date
}

/**
 * FOMREQ: Flat Out Management Request, outlines the contract that some request to the API must adhere to.
 */
export type FOMReq = {
  auth?: Authentication,
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

