import {connection, Schema} from "mongoose";
import {ModelType, RoleEnum} from "../Interfaces/UtilInterfaces";
import {EntityAndRole} from "../Interfaces/_FOMObjects";

/**
 * NAME: A required string value that represents the shown title of the document.
 */
export const Name = {
  type: String,
  required: [true, `Missing 'Name' from construction`],
  minLength: 3,
  maxLength: 20,
  trim: true
}

/**
 * PASSWORD: A required string value that represents the secret that enables authentication to some document
 * information.
 */
export const Password = {
  type: String,
  required: [true, `Missing 'Password' from construction`],
  minLength: 12,
}

/**
 * SESSION: A string that represents a secret between the Server and the Client. Knowing this secret, enables
 * automatic login.
 */
export const Session = {
  type: String,
  unique: true,
  sparse: true
}

/**
 * DATE FROM TODAY: A Date value, where the minimum value can only be today (anything beforehand is deemed irrelevant)
 */
const getCurrentDay = () => {
  let now = new Date(Date.now())
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

export const DateFromToday = {
  type: Date,
  min: getCurrentDay()
}

/**
 * ROLE: A string value where it can only be one of several enum values.
 */
export const Role = {
  type: String,
  enum: RoleEnum,
  default: RoleEnum.JOIN_REQ
}

/**
 * DEFAULT TRUE: A boolean value, where it's true by default (without interaction)
 */
export const DefaultTrue = {
  type: Boolean,
  default: true,
}

/**
 * GENERATE ID: A function to create an ID (Types.ObjectId), with a reference to a specific Model.
 * @param ref: ModelType enum, that represent which Model this id refers to
 * @constructor
 */
export const GenerateId = (ref: ModelType) => {
  return {
    type: Schema.Types.ObjectId,
    sparse: true,
    ref: ref,
    validate: async (val: any) => {
      return (await connection.db.collection(ref).countDocuments({_id: val})) > 0
    }
  }
}

/**
 * GENERATE ENTITY AND ROLE: A function to create an ID (Types.ObjectId), with a link to a specific authorization.
 * @param ref: ModelType enum, that represent which Model this id refers to
 * @constructor
 */
export const GenerateEntityAndRole = (ref: ModelType) => new Schema<EntityAndRole>({
  entity: GenerateId(ref),
  role: Role,
})