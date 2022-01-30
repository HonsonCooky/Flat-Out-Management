import {Types} from "mongoose";
import {RoleEnum} from "./UtilInterfaces";

/**
 * FOM OBJECT: Flat Out Management Object.
 */
export interface FOMObject {
  _id: Types.ObjectId
}

/**
 * FOM OBJECT WITH NAME: Flat Out Management Object with a name.
 */
export interface FOMObjectWithName extends FOMObject {
  name: string
}

/**
 * FOM OBJECT LINK: Flat Out Management Object Link has a connection to another object(s).
 */
export interface FOMObjectWithLinks extends FOMObject {
  associations: Types.ObjectId[]
}

/**
 * FOM OBJECT TIME STAMPED: Flat Out Management Object with time stamps enabled.
 */
export interface FOMObjectTimeStamped extends FOMObject {
  createdAt: Date,
  updatedAt: Date
}

/**
 * ENTITY AND ROLE: A link to some document, where some level of authorization is connected.
 */
export interface EntityAndRole extends FOMObject {
  entity: Types.ObjectId,
  role: RoleEnum
}