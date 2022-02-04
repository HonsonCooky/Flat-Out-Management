import {DocRoleAndModel} from "./_docRoleAndModel";
import {Document, Types} from "mongoose";

/**
 * NAMED: An object with a mandatory 'name'.
 */
export interface INamed {
  name: string
}

/**
 * LINKED: An object with connections to other documents.
 */
interface ILinked {
  associations: DocRoleAndModel[]
}

/**
 * TIME STAMPED: An object that is timestamped
 */
interface ITimeStamped {
  createdAt: Date,
  updatedAt: Date
}

/**
 * FOM COLLECTION DOCUMENT: All baseline schemas will follow this basic outline.
 */
export interface IFOMCollectionDocument extends Document<Types.ObjectId>, INamed, ILinked, ITimeStamped {
  FOMVersion: string,
}

/**
 * IREQ: Flat Out management Request, outlines the contract that some request to the API must adhere to.
 */
export interface IReq extends IFOMCollectionDocument {
  [key: string]: any
}

/**
 * IRES: Flat Out management Result, outlines the contract that the API will adhere to, sending anything back to
 * the client.
 */
export type IRes = {
  msg: string,
  item?: any,
  token?: string
}

