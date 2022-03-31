import {Schema, SchemaDefinitionProperty, Types} from "mongoose";
import {env} from "../../config/Config"
import {
  IFomAssociation,
  IFomEvent,
  IFomTable,
  IFomTableCompound,
  IFomTableRecord,
  IFomTableRotationConfig,
  IFomTableRotationUpdateField,
  ModelType,
  RoleType,
  TimeIntervals,
  WeekDays
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
  required: true,
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
  required: true
}

/**
 * FOM ASSOCIATION: A tuple of different SchemaDefinitionProperty
 */
// REF
const FOM_ASSOCIATION_REF: SchemaDefinitionProperty<Types.ObjectId> = {
  type: Schema.Types.ObjectId,
  required: true,
  refPath: 'model'
}

// MODEL
const FOM_ASSOCIATION_MODEL: SchemaDefinitionProperty<ModelType> = {
  type: String,
  enum: ModelType,
  validate: function (val: number) {
    return 0 <= val && val < Object.keys(ModelType).length
  }
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
  required: true,
  validate: {
    validator: (value: string) => verRegex.test(value),
    message: ({value}) => `500: Illegal Versioning ${value}`
  }
}

/**
 * EVENT: Some tuple of date, title and message.
 */
export const FOM_EVENT: SchemaDefinitionProperty<IFomEvent> = {
  date: {type: Date, required: true},
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
  required: true,
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
// Row
const FOM_TABLE_RECORD: SchemaDefinitionProperty<IFomTableRecord> = {
  type: [String || FOM_ASSOCIATION || Date]
}

// Record
export const FOM_TABLE_COMPOUND: SchemaDefinitionProperty<IFomTableCompound> = {
  values: [FOM_TABLE_RECORD],
  fieldIndexes: [Number]
}

/**
 * TABLE ROTATION CONFIGURATION: Outlines options that can be set for a table
 */
// Update field
const FOM_TABLE_UPDATE_FIELD: SchemaDefinitionProperty<IFomTableRotationUpdateField> = {
  next: Date,
  start: {type: Date, required: true}
}

// Configuration
export const FOM_TABLE_CONFIG_ROTATION: SchemaDefinitionProperty<IFomTableRotationConfig> = {
  column: {
    type: Number,
    required: true,
    validate: function (val: number) {
      let table: IFomTable = this as IFomTable
      return table ? 0 <= val && val < table.records.values.length : false
    }
  },
  update: FOM_TABLE_UPDATE_FIELD,
  intervalUnit: {
    type: Number,
    enum: TimeIntervals,
    validate: function (val: number) {
      return 0 <= val && val < Object.keys(TimeIntervals).length
    }
  },
  intervalValue: {type: Number, required: true},
  intervalPOR: {
    type: Number,
    enum: WeekDays,
    validate: function (val: number) {
      return 0 <= val && val < Object.keys(WeekDays).length
    }
  }
}