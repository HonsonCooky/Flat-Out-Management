import {Schema, SchemaDefinitionProperty, Types} from "mongoose";
import {CONFIG} from "../../Config"
import {EventType, ModelType, RoleType, TimeIntervals} from "../../interfaces/IFomEnums";
import {IFomAssociation} from "../../interfaces/IFomAssociation";
import {IFomEvent, IFomEventNotification} from "../../interfaces/IFomEvent";
import {IFomCellCalculation, IFomTable, IFomTableRecord, IFomTableRotationConfig} from "../../interfaces/IFomTable";

function getParent<T>(t: any): T {
  if (!t) throw new Error('500: Unable to get parent with null')
  return t.parent();
}

/** ------------------------------------------------------------------------------------------------------------------
 * GENERIC
 ------------------------------------------------------------------------------------------------------------------ */

/**
 * A string value which will be used to validate the username + password login
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
 * A string value which will be displayed client side
 */
export const FOM_UI_NAME: SchemaDefinitionProperty<string> = {
  type: String,
  trim: true,
  minlength: 3,
  maxlength: 30,
}

/**
 * A string value, which is required, but can also be null
 */
export const FOM_PASSWORD: SchemaDefinitionProperty<string> = {
  type: String,
  required: true
}

/**
 * A tuple of different SchemaDefinitionProperty, outlining a connection from this to another document.
 */
// REF
const FOM_ASSOCIATION_REF: SchemaDefinitionProperty<Types.ObjectId> = {
  type: Schema.Types.ObjectId,
  required: true,
  ref: function () {
    return this.model
  }
}

// MODEL
const FOM_ASSOCIATION_MODEL: SchemaDefinitionProperty<ModelType> = {
  type: String,
  enum: ModelType,
  required: true
}

// ROLE
const FOM_ASSOCIATION_ROLE: SchemaDefinitionProperty<RoleType> = {
  type: String,
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
 * Maintains semantic versioning for document.
 */
const verRegex = new RegExp(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/)

export const FOM_VERSION: SchemaDefinitionProperty<string> = {
  type: String,
  default: CONFIG.version,
  required: true,
  validate: {
    validator: (value: string) => verRegex.test(value),
    message: ({value}) => `500: Illegal Versioning ${value}`
  }
}

/**
 * Outlines a color associated with some user. For UI intentions, must be unique (allows easy
 * association of users).
 */
export const FOM_COLOR_ASSOCIATION: SchemaDefinitionProperty<string> = {
  type: String,
  default: "#ffffff",
  validate: function (uiColor: string): boolean {
    return (/#[0-9a-f]{6}/).test(uiColor)
  }
}


/**
 * Some tuple of date, title and message.
 */
// EventType
const FOM_EVENT_TYPE: SchemaDefinitionProperty<EventType> = {
  type: String,
  enum: EventType,
  default: EventType.USER
}

// Event Notification
const FOM_EVENT_NOTIFICATION: SchemaDefinitionProperty<IFomEventNotification> = {
  associations: [FOM_ASSOCIATION],
  notificationTime: Date
}

// IFomEvent
export const FOM_EVENT: SchemaDefinitionProperty<IFomEvent> = {
  from: {type: Date, required: true},
  to: {type: Date, required: true},
  eType: FOM_EVENT_TYPE,
  header: FOM_NAME,
  message: String,
  color: FOM_COLOR_ASSOCIATION,
  notifications: [FOM_EVENT_NOTIFICATION]
}

/** ------------------------------------------------------------------------------------------------------------------
 * USER
 ------------------------------------------------------------------------------------------------------------------ */

/**
 * A changing ID which will uniquely identify a user, but one which will alter (for JWT authentication)
 */
export const FOM_DYNAMIC_UUID: SchemaDefinitionProperty<Types.ObjectId> = {
  type: Schema.Types.ObjectId,
  required: true,
  sparse: true,
  unique: true,
}

/** ------------------------------------------------------------------------------------------------------------------
 * TABLE
 ------------------------------------------------------------------------------------------------------------------ */
/**
 * Outlines the total number of columns.
 */
export const FOM_TABLE_LENGTH: SchemaDefinitionProperty<number> = {
  type: Number,
  required: true,
}

/**
 * Outlines the configurations for a table rotation
 */
export const FOM_TABLE_CONFIG_ROTATION: SchemaDefinitionProperty<IFomTableRotationConfig> = {
  column: {
    type: Number,
    validate: function (val: number) {
      let table = getParent<IFomTable>(this)
      return 0 <= val && val < table.colLength
    }
  },
  startDate: {type: Date, default: new Date()},
  nextUpdate: Date,
  intervalValue: {type: Number, min: 1, required: true},
  intervalUnit: {type: String, enum: TimeIntervals, required: true},
}

/**
 * Allows for some cell's value to be the executed value of this one
 */
const FOM_TABLE_CELL_CALCULATION: SchemaDefinitionProperty<IFomCellCalculation> = {
  codeStr: {
    type: String,
    required: true
  }
}

/**
 * Outlines the types of data objects, that can be stored in a table record
 */
export const FOM_TABLE_RECORD: SchemaDefinitionProperty<IFomTableRecord> = {
  type: [(String || Number || Date || FOM_ASSOCIATION || FOM_EVENT || FOM_TABLE_CELL_CALCULATION)],
}