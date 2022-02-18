import {Document, Types} from "mongoose";
import {ModelEnum, RoleEnum} from "./GlobalEnums";
import {JwtPayload} from "jsonwebtoken"

/**
 * DOC, MODEL AND ROLE: A tuple that connects some id to it's MongoDB model, and a role
 */
export interface IDocModelAndRole {
  doc: Types.ObjectId,
  docModel: ModelEnum
  role: RoleEnum
}

/**
 * FOM OBJECT: A generic object which can be either a FOMNode or FOMProtectedNode
 */
export type IFomObject = IFomController | IFomNode | IFomDoc;

/**
 * FOM DOC: Every document in the MongoDB database will have these outlining features
 */
export interface IFomDoc extends Document<Types.ObjectId> {
  _id: Types.ObjectId, // Hidden
  _doc: any,
  uiName: string
  fomVersion: string,
  readAuthLevel: RoleEnum, // Hidden
  writeAuthLevel: RoleEnum, // Hidden
  createdAt: Date,
  updatedAt: Date,
}

/**
 * FOM NODE: A node is a middle document that no ONE client controls, but it creates a common link between multiple
 * controllers and documents.
 */
export interface IFomNode extends IFomDoc {
  docName: string, // Hidden (kind of)
  password: string, // Hidden
  associations: IDocModelAndRole[]
}

/**
 * FOM CONTROLLER: A controller is a document that maintains a client's information. It enables authentication and
 * verification of actions.
 */
export interface IFomController extends IFomNode {
  uuid: Types.ObjectId // Hidden
}

/**
 * JWT CONTRACT: A jwt token can be extracted to this contract. It must also be signed using this contract.
 */
export interface JwtAuthContract extends JwtPayload {
  uuid: Types.ObjectId
}

/**
 * IRES: Flat Out management Result, outlines the contract that the API will adhere to, sending anything back to
 * the client.
 */
export type IRes = {
  msg: string,
  item?: IFomObject,
  token?: string
}
