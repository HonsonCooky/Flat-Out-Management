import {Document, Types} from "mongoose";
import {ModelEnum, RoleEnum} from "./_enums";
import {JwtPayload} from "jsonwebtoken"

/**
 * DOC, MODEL AND ROLE: A tuple that connects some id to it's MongoDB model, and a role
 */
export interface IDocModelAndRole {
  doc: Types.ObjectId,
  docModel: ModelEnum
  role: RoleEnum,
  secret: string,
}

/**
 * FOM OBJECT: A generic object which can be either a FOMNode or FOMProtectedNode
 */
export type IFomObject = IFomController | IFomCollective;

/**
 * FOM DOC: Every document in the MongoDB database will have these outlining features
 */
interface IFomDoc extends Document<Types.ObjectId> {
  docName: string,
  password: string, // Hidden
  uiName: string
  associations: IDocModelAndRole[]
  fomVersion: string,
  createdAt: Date,
  updatedAt: Date,
  _id: Types.ObjectId, // Hidden
  _doc: any,
}

/**
 * FOM CONTROLLER: A controller has the authority to enact some action. JWT will be associated to these documents
 * (hence the dynamic UUID).
 */
export interface IFomController extends IFomDoc {
  uuid: Types.ObjectId // Hidden
}

/**
 * FOM COLLECTIVE: A collective is simply a collection of information. Each collective is given a password, however,
 * some passwords may be transitive (nested documents). Read permissions are enabled to all documents with an
 * association higher than RoleEnum.JOIN_REQUEST to this document. Write permissions are enabled to all IFomControllers
 * with AT LEAST 'authLevel' of association.
 */
export interface IFomCollective extends IFomDoc {
  authLevel: RoleEnum // Hidden
}

/**
 * BODY AUTH CONTRACT: Used for cases where a docName,
 */
export interface BodyAuthContract {
  docPass?: { docName: string, password: string }
  dmr?: IDocModelAndRole

  [key: string]: any,
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
