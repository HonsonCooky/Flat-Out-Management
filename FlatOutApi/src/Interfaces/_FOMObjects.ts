import {Types} from "mongoose";
import {RoleEnum} from "./UtilInterfaces";

/**
 * FOM OBJECT: Flat Out Management Object.
 */
export interface Document {
  _id: Types.ObjectId
}

/**
 * FOM OBJECT WITH NAME: Flat Out Management Object with a name.
 */
export interface NamedDocument extends Document {
  name: string
}

/**
 * FOM OBJECT LINK: Flat Out Management Object Link has a connection to another object(s).
 */
export interface LinkedDocument extends Document {
  associations: Types.ObjectId[]
}

/**
 * FOM OBJECT TIME STAMPED: Flat Out Management Object with time stamps enabled.
 */
export interface TimeStampedDocument extends Document {
  createdAt: Date,
  updatedAt: Date
}

/**
 * ENTITY AND ROLE: A link to some document, where some level of authorization is connected.
 */
export interface EntityAndRole extends Document {
  entity: Types.ObjectId,
  role: RoleEnum
}




















