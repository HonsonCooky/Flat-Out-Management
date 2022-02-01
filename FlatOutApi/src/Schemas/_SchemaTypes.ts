import {SchemaDefinitionProperty, Types} from "mongoose";
import {ModelEnum, RoleEnum} from "../Interfaces/_Enums";
import {DocRoleAndModel} from "../Interfaces/_Utils";
import {addLogs} from "../Util/Logging";

/**
 * NAME: A required string value that represents the shown title of the document.
 */
export const Name: SchemaDefinitionProperty<string> = {
  type: String,
  minLength: 3,
  maxLength: 50,
  trim: true,
  required: [true, `Missing 'Name'`]
}

/**
 * PASSWORD: A required string value that represents the secret that enables authentication to some document
 * information.
 */
export const Password: SchemaDefinitionProperty<string>  = {
  type: String,
  minLength: 12,
  required: [true, `Missing 'Password'`]
}

/**
 * SESSION: A string that represents a secret between the Server and the Client. Knowing this secret, enables
 * automatic login.
 */
export const Token: SchemaDefinitionProperty<string> = {
  type: String,
  sparse: true,
  unique: true,
  required: [true, "Missing 'Token'"]
}

export const today = (): Date => {

/**
 * DATE FROM TODAY: A Date value, where the minimum value can only be today (anything beforehand is deemed irrelevant)
 */
  let now = new Date(Date.now())
  let t = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  addLogs(`Today: ${t.toLocaleString()}`)
  return t
}
export const DateFromToday: SchemaDefinitionProperty<Date> = {
  type: Date,
  min: today()
}

/**
 * DEFAULT TRUE: A boolean value, where it's true by default (without interaction)
 */
export const DefaultTrue: SchemaDefinitionProperty<boolean> = {
  type: Boolean,
  default: true,
}

/**
 * ID: A fancy Types.ObjectId wrapper
 */
export const Id: SchemaDefinitionProperty<Types.ObjectId> = {
  type: Types.ObjectId,
  required: [true, `Missing 'Id'`],
  sparse: true,
  unique: true,
  ref: (doc: DocRoleAndModel) => doc.docModel
}

/**
 * ROLE: A string value where it can only be one of several enum values.
 */
export const RoleType: SchemaDefinitionProperty<RoleEnum> = {
  type: String,
  enum: RoleEnum,
  default: RoleEnum.UNDEFINED
}

/**
 * DYNAMIC REF: An enum used to define the type of model that something is linked to.
 */
export const ModelType: SchemaDefinitionProperty<ModelEnum> = {
  type: String,
  enum: ModelEnum,
  required: [true, `Missing 'Dynamic Reference'`]
}

/**
 * ENTITY ROLE AND REF TYPE: A tuple, connecting some link to a document, with a reference and role (which can be
 * RoleEnum.UNDEFINED)
 */
export const DocRoleAndRefType: SchemaDefinitionProperty<DocRoleAndModel> = {
  doc: Id,
  role: RoleType,
  docModel: ModelType
}
