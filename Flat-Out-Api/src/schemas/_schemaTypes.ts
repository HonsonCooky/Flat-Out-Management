import {SchemaDefinitionProperty, Types} from "mongoose";
import {ModelEnum, RoleEnum} from "../interfaces/_enums";
import {IDocModelAndRole} from "../interfaces/_docRoleAndModel";
import logger from "../config/Logging";
import envConfig from "../config/EnvrionmentConfig";

/**
 * NAME: A required string value that represents the shown title of the document.
 */
export const DocName: SchemaDefinitionProperty<string> = {
  type: String,
  trim: true,
  required: [true, `Missing 'DocName'`],
  unique: true,
  sparse: true
}

/**
 * PASSWORD: A required string value that represents the secret that enables authentication to some document
 * information.
 */
export const Password: SchemaDefinitionProperty<string> = {
  type: String,
  minLength: 12,
  required: [true, `Missing 'Password'`]
}

/**
 * NICKNAME: A non-required, but nicety, to store for UI purposes
 */
export const UiName: SchemaDefinitionProperty<string> = {
  type: String,
  minLength: 3,
  maxLength: 20,
  trim: true
}

/**
 * VERSION: Maintains semantic versioning for document.
 */
// Simple '1.0.0' semantic versions regex
const verRegex = new RegExp(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/)

export const Version: SchemaDefinitionProperty<string> = {
  type: String,
  default: envConfig.fomVersion,
  required: [true, `Missing 'Version'`],
  validate: {
    validator: (value: string) => verRegex.test(value),
    message: ({value}) => `500: Illegal Versioning ${value}`
  }
}

/**
 * DATE FROM TODAY: A Date value, where the minimum value can only be today (anything beforehand is deemed irrelevant)
 */
const today = (): Date => {
  let now = new Date(Date.now())
  let t = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  logger.info(`Today: ${t.toLocaleString()}`)
  return t
}

export const DateFromToday: SchemaDefinitionProperty<Date> = {
  type: Date,
  min: [today(), `400: Date needs to be after today (incl). Consider placing date in history?`]
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
}

const IdRef: SchemaDefinitionProperty<Types.ObjectId> = {
  type: Types.ObjectId,
  required: [true, `Missing 'Id'`],
  sparse: true,
  unique: true,
  ref: (doc: IDocModelAndRole) => doc.docModel
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
 * DOC, MODEL AND ROLE TYPE: A tuple, connecting some link to a document, with a reference and role (which can be
 * RoleEnum.UNDEFINED)
 */
export const DocModelAndRoleType: SchemaDefinitionProperty<IDocModelAndRole> = {
  doc: IdRef,
  docModel: ModelType,
  role: RoleType
}
