import {SchemaDefinitionProperty, Types, Schema} from "mongoose";
import {env} from "../../config/Config"
import {
  IFomAssociation,
  IFomEvent,
  IFomTableCell,
  IFomTableRecord,
  IFomTableRotation,
  ModelType,
  RoleType,
  TimeIntervals, WeekDays,
} from "flat-out-interfaces";


/** ------------------------------------------------------------------------------------------------------------------
 * GENERIC
 ------------------------------------------------------------------------------------------------------------------ */

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
  required: [true, "Missing password"]
}

/**
 * FOM ASSOCIATION: A tuple of different SchemaDefinitionProperty
 */
// REF
const FOM_ASSOCIATION_REF: SchemaDefinitionProperty<Types.ObjectId> = {
  type: Schema.Types.ObjectId,
  required: [true, "Association is missing a reference"],
  refPath: 'model'
}

// MODEL
const FOM_ASSOCIATION_MODEL: SchemaDefinitionProperty<ModelType> = {
  type: String,
  enum: ModelType,
  required: [true, "Association is missing a model type"]
}

// ROLE
const FOM_ASSOCIATION_ROLE: SchemaDefinitionProperty<RoleType> = {
  type: Number,
  enum: RoleType,
  default: RoleType.MENTIONED
}

// ASSOCIATION
export const FOM_ASSOCIATION: SchemaDefinitionProperty<IFomAssociation> = {
  ref: FOM_ASSOCIATION_REF,
  model: FOM_ASSOCIATION_MODEL,
  role: FOM_ASSOCIATION_ROLE
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

/**
 * EVENT: Some tuple of date, title and message.
 */
export const FOM_EVENT: SchemaDefinitionProperty<IFomEvent> = {
  date: {type: Date, required: [true, "Missing calendar event date"]},
  title: FOM_NAME,
  message: String
}


/** ------------------------------------------------------------------------------------------------------------------
 * USER
 ------------------------------------------------------------------------------------------------------------------ */

/**
 * FOM DYNAMIC UUID: A changing ID which will uniquely identify a user, but one which will alter (for JWT
 * authentication)
 */
export const FOM_DYNAMIC_UUID: SchemaDefinitionProperty<Types.ObjectId> = {
  type: Schema.Types.ObjectId,
  required: [true, `Missing dynamic UUID`],
  sparse: true,
  unique: true,
}

/** ------------------------------------------------------------------------------------------------------------------
 * GROUP
 ------------------------------------------------------------------------------------------------------------------ */

/** ------------------------------------------------------------------------------------------------------------------
 * TABLE
 ------------------------------------------------------------------------------------------------------------------ */

/**
 * TABLE OPTIONS: Outlines options that can be set for a table
 */
export const FOM_TABLE_CONFIG_ROTATION: SchemaDefinitionProperty<IFomTableRotation> = {
  column: {type: String, required: [true, "Missing column number for table rotation"]},
  update: {type: {}, required: [true, "Missing update values"]},
  intervalUnit: {type: String, enum: TimeIntervals, default: TimeIntervals.WEEKLY},
  intervalValue: {type: Number, required: [true, "Missing interval value for table rotation"]},
  intervalPOR: {type: Number, enum: WeekDays}
}

/**
 * CELL: Outlines the value of a given cell
 */
const FOM_TABLE_CELL: SchemaDefinitionProperty<IFomTableCell> = {
  value: {type: String || FOM_ASSOCIATION || Date},
  field: {type: String, required: [true, "Missing field allocation"]},
}

/**
 * ROW: Outlines a row inside a table
 */
export const FOM_TABLE_RECORD: SchemaDefinitionProperty<IFomTableRecord> = {
  value: {type: [FOM_TABLE_CELL], minlength: 1, maxlength: 7},
  rowNumber: {type: Number, required: [true, "Missing record row number"]},
}