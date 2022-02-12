import {Document, Types} from "mongoose";
import {ModelEnum, RoleEnum} from "./_enums";
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
export type IFOMObject = IFomDoc | IFomProtectDoc

/**
 * FOM COLLECTION DOCUMENT: A node object with links to other objects.
 */
export interface IFomDoc extends Document<Types.ObjectId> {
  docName: string,
  uiName: string
  associations: IDocModelAndRole[]
  fomVersion: string,
  createdAt: Date,
  updatedAt: Date,
  _id: Types.ObjectId,
  _doc: any,
}

/**
 * FOM PROTECTED COLLECTION Node: A protected node object, with links to other objects and some authorization to
 * view.
 */
export interface IFomProtectDoc extends IFomDoc {
  uuid: Types.ObjectId,
  password: string,
}

/**
 * BODY AUTH CONTRACT: If the body of a request is authenticating something, then it needs a docName and a password.
 */
export interface BodyAuthContract {
  docName: string,
  password: string

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
  item?: IFOMObject,
  token?: string
}
