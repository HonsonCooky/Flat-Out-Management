import {DocRoleAndModel} from "./_utilInterfaces";

/**
 * NAMED: An object with a mandatory 'name'.
 */
export interface Named {
  name: string
}

/**
 * LINKED: An object with connections to other documents.
 */
interface Linked {
  associations: DocRoleAndModel[]
}

/**
 * TIME STAMPED: An object that is timestamped
 */
interface TimeStamped {
  createdAt: Date,
  updatedAt: Date
}

/**
 * FOM COLLECTION DOCUMENT: All baseline schemas will follow this basic outline.
 */
export interface FOMCollectionDocument extends Document, Named, Linked, TimeStamped {
  FOMVersion: string,
}

/**
 * FOMREQ: Flat Out management Request, outlines the contract that some request to the API must adhere to.
 */
export type FOMReq = {
  params: any,
  body: {

  }
}

/**
 * FOMRES: Flat Out management Result, outlines the contract that the API will adhere to, sending anything back to
 * the client.
 */
export type FOMRes = {
  item?: any,
  msg: string
}

