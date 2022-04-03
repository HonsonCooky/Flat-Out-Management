import {Schema, SchemaDefinitionProperty, Types} from "mongoose";
import {env} from "../../config/Config"
import {
  EventType,
  IFomAssociation,
  IFomEvent,
  IFomTable,
  IFomTableRecord,
  IFomTableRotationConfig,
  ModelType,
  RoleType,
  TimeIntervals
} from "flat-out-interfaces";


function getParent<T>(t: any): T {
  if (!t) throw new Error('500: Unable to get parent with null')
  return t.parent();
}

/** ------------------------------------------------------------------------------------------------------------------
 * GENERIC
 ------------------------------------------------------------------------------------------------------------------ */

/**
 * NAME: A string value which will be used to validate the username + password login
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
 * UI NAME: A string value which will be displayed client side
 */
export const FOM_UI_NAME: SchemaDefinitionProperty<string> = {
  type: String,
  trim: true,
  minlength: 3,
  maxlength: 30,
}

/**
 * PASSWORD: A string value, which is required, but can also be null
 */
export const FOM_PASSWORD: SchemaDefinitionProperty<string> = {
  type: String,
  required: true
}

/**
 * ASSOCIATION: A tuple of different SchemaDefinitionProperty, outlining a connection from this to another document.
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
  required: true
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
  eType: {type: Number, enum: EventType, default: EventType.USER},
  header: FOM_NAME,
  message: String
}


/** ------------------------------------------------------------------------------------------------------------------
 * USER
 ------------------------------------------------------------------------------------------------------------------ */

/**
 * DYNAMIC UUID: A changing ID which will uniquely identify a user, but one which will alter (for JWT authentication)
 */
export const FOM_DYNAMIC_UUID: SchemaDefinitionProperty<Types.ObjectId> = {
  type: Schema.Types.ObjectId,
  required: true,
  sparse: true,
  unique: true,
}

/**
 * COLOR ASSOCIATION: Outlines a color associated with some user. For UI intentions, must be unique (allows easy
 * association of users).
 */
export const FOM_COLOR_ASSOCIATION: SchemaDefinitionProperty<string> = {
  type: String,
  required: true,
  unique: true,
  validate: function (uiColor: string): boolean {
    return (/#[0-9a-f]{6}/).test(uiColor)
  }
}

/** ------------------------------------------------------------------------------------------------------------------
 * GROUP
 ------------------------------------------------------------------------------------------------------------------ */

/** ------------------------------------------------------------------------------------------------------------------
 * TABLE
 ------------------------------------------------------------------------------------------------------------------ */
/**
 * TABLE COLUMNS: Outlines the total number of columns.
 */
export const FOM_TABLE_COLUMNS: SchemaDefinitionProperty<number> = {
  type: Number,
  required: true
}

/**
 * TABLE FIELD INDEXES: Outlines which rows inside a table, are headers. Mostly used for UI, but also rotations.
 */
export const FOM_TABLE_FIELD_INDEXES: SchemaDefinitionProperty<number> = {
  type: Number,
  validate: function (val: number) {
    let table: any = this
    return table ? 0 <= val && val < table.records.length : false
  }
}

/**
 * TABLE RECORD: Outlines a row in the table, outlining a list of valid object types inside a cell.
 */
export const FOM_TABLE_RECORD: SchemaDefinitionProperty<IFomTableRecord> = {
  type: [String || FOM_ASSOCIATION || Date]
}

/**
 * TABLE CONFIG ROTATION: Outlines the configurations for a table rotation
 */
export const FOM_TABLE_CONFIG_ROTATION: SchemaDefinitionProperty<IFomTableRotationConfig> = {
  column: {
    type: Number,
    validate: function (val: number) {
      let table: IFomTable = getParent<IFomTable>(this)
      console.log(table.columns)
      return 0 <= val && val < table.columns
    }
  },
  startDate: {type: Date, default: new Date()},
  nextUpdate: Date,
  intervalValue: {type: Number, default: 1},
  intervalUnit: {
    type: Number,
    enum: TimeIntervals
  },
}