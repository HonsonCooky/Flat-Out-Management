import {SchemaDefinitionProperty, Types} from "mongoose";
import {IFomAssociation} from "../../interfaces/IFomAssociation";
import {ModelEnum, RoleEnum, SortByEnum, TableFieldEnum, TimeIntervalEnum} from "../../interfaces/FomEnums";
import {env} from "../../config/Config"
import {IFomTableConfig, ITableConfigField, ITableRotation, ITableSort} from "../../interfaces/IFomTableConfig";
import {IFomTableCell, IFomTableField, IFomTableHeader, IFomTableRecord} from "../../interfaces/IFomTableContents";
import {IFomEvent} from "../../interfaces/IFomEvent";


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
  type: Types.ObjectId,
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
const FOM_TABLE_CONFIG_FIELD: SchemaDefinitionProperty<ITableConfigField> = {
  column: {type: String, required: [true, "Missing column number for table rotation"]},
  nextUpdate: {type: Date, required: [true, "Missing next update value"]}
}

const FOM_TABLE_CONFIG_ROTATIONS: SchemaDefinitionProperty<ITableRotation> = {
  ...FOM_TABLE_CONFIG_FIELD,
  intervalUnit: {type: String, enum: TimeIntervalEnum, default: TimeIntervalEnum.WEEKLY},
  intervalValue: {type: Number, required: [true, "Missing interval value for table rotation"]}
}

const FOM_TABLE_CONFIG_SORT: SchemaDefinitionProperty<ITableSort> = {
  ...FOM_TABLE_CONFIG_FIELD,
  sortType: {type: String, enum: SortByEnum}
}

export const FOM_TABLE_CONFIG: SchemaDefinitionProperty<IFomTableConfig> = {
  rotations: [FOM_TABLE_CONFIG_ROTATIONS],
  sortBy: [FOM_TABLE_CONFIG_SORT]
}

/**
 * TABLE FIELD: Outlines the value and validation of a tables field
 */
const FOM_TABLE_FIELD: SchemaDefinitionProperty<IFomTableField> = {
  value: String,
  fieldType: {type: String, enum: TableFieldEnum, default: TableFieldEnum.STRING},
  columnNumber: {type: Number, required: [true, "Missing field column number"]},
}

/**
 * TABLE HEADER: Outlines the list of table fields
 */
export const FOM_TABLE_HEADER: SchemaDefinitionProperty<IFomTableHeader> = {
  type: [FOM_TABLE_FIELD],
  required: [true, "Missing table header"],
  minlength: 1,
  maxlength: 7
}

/**
 * CELL: Outlines the value of a given cell
 */
const FOM_TABLE_CELL: SchemaDefinitionProperty<IFomTableCell> = {
  value: {type: String || FOM_ASSOCIATION || Date},
  field: {type: String, required: [true, "Missing field allocation"]},
  validate: () => {
    console.log(this)
  }
}

/**
 * ROW: Outlines a row inside a table
 */
export const FOM_TABLE_RECORD: SchemaDefinitionProperty<IFomTableRecord> = {
  value: [FOM_TABLE_CELL],
  rowNumber: {type: Number, required: [true, "Missing record row number"]}
}