import {IDocModelAndRole} from "./_docRoleAndModel";
import {Document, Types} from "mongoose";

/**
 * FOM COLLECTION DOCUMENT: A node object with links to other objects.
 */
export interface IFOMNode extends Document<Types.ObjectId> {
  docName: string,
  uiName: string
  associations: IDocModelAndRole[]
  fomVersion: string,
  createdAt: Date,
  updatedAt: Date,
  _doc: any,
}

/**
 * FOM PROTECTED COLLECTION Node: A protected node object, with links to other objects and some authorization to
 * view.
 */
export interface IFOMProtectedNode extends IFOMNode {
  uuid: Types.ObjectId,
  password: string
}

export type IFOMObject = IFOMNode | IFOMProtectedNode

/**
 * IRES: Flat Out management Result, outlines the contract that the API will adhere to, sending anything back to
 * the client.
 */
export type IRes = {
  msg: string,
  item?: IFOMNode | IFOMProtectedNode,
  token?: string
}

/**
 * JSON WEB TOKEN contract
 */
export type JWTPayload = {
  uuid: Types.ObjectId
}
