import {SchemaDefinitionProperty, Types} from "mongoose";
import {IFomAssociation} from "../../interfaces/IFomAssociation";
import {ModelEnum, RoleEnum} from "../../interfaces/FomEnums";
import {env} from "../../config/EnvConfig"

/**
 * FOM NAME: A string value which will be used to validate the username + password login
 */
export const FOM_NAME: SchemaDefinitionProperty<string> = {
  type: String,
  trim: true,
  unique: true,
  sparse: true,
  minlength: 3,
  maxlength: 30,
  required: [true, "Missing Name"],
}

/**
 * FOM NICKNAME: A string value which will be displayed client side
 */
export const FOM_UI_NAME: SchemaDefinitionProperty<string> = {
  type: String,
  trim: true,
  minlength: 3,
  maxlength: 30,
}

/**
 * FOM PASSWORD: A string value, which is required, but can also be null
 */
export const FOM_PASSWORD: SchemaDefinitionProperty<string> = {
  type: String,
  sparse: true,
  required: [true, "Missing password"]
}

/**
 * FOM ASSOCIATION: A tuple of different SchemaDefinitionProperty
 */
// REF
const FOM_ASSOCIATION_REF: SchemaDefinitionProperty<Types.ObjectId> = {
  type: Types.ObjectId,
  required: [true, "Association is missing a reference"],
  refPath: 'model'
}

// MODEL
const FOM_ASSOCIATION_MODEL: SchemaDefinitionProperty<ModelEnum> = {
  type: String,
  enum: ModelEnum,
  required: [true, "Association is missing a model type"]
}

// ROLE
const FOM_ASSOCIATION_ROLE: SchemaDefinitionProperty<RoleEnum> = {
  type: String,
  enum: RoleEnum,
  default: RoleEnum.NULL
}

// ASSOCIATION
export const FOM_ASSOCIATION: SchemaDefinitionProperty<IFomAssociation> = {
  ref: FOM_ASSOCIATION_REF,
  model: FOM_ASSOCIATION_MODEL,
  role: FOM_ASSOCIATION_ROLE
}

/**
 * FOM DYNAMIC UUID: A changing ID which will uniquely identify a user, but one which will alter (for JWT
 * authentication)
 */
export const FOM_DYNAMIC_UUID: SchemaDefinitionProperty<Types.ObjectId> = {
  type: Types.ObjectId,
  required: [true, `Missing dynamic UUID`],
  sparse: true,
  unique: true,
}

/**
 * VERSION: Maintains semantic versioning for document.
 */
const verRegex = new RegExp(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/)

export const FOM_VERSION: SchemaDefinitionProperty<string> = {
  type: String,
  default: env.version,
  required: [true, `Missing 'Version'`],
  validate: {
    validator: (value: string) => verRegex.test(value),
    message: ({value}) => `500: Illegal Versioning ${value}`
  }
}