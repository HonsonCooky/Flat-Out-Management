import {Schema, SchemaDefinition, SchemaDefinitionProperty} from "mongoose";
import {DbObject} from "../interfaces/db-object";
import {Association, ModelType, RoleType} from "../interfaces/association";
import {RepeatCycle, TimeUnits} from "../interfaces/non-entities/repeat";

/**
 * Schema definition for {@link Association}
 */
export const AssociationSchema: SchemaDefinitionProperty<Association> = {
  type: {
    ref: {type: Schema.Types.ObjectId, required: true,},
    model: {type: String, enum: ModelType, required: true,},
    role: {type: String, enum: RoleType, required: true},
    value: {type: String, required: true}
  }
}

/**
 * Schema definition extension for {@link Association}, that also includes a REQUIRED field. Where possible (inside
 * arrays), avoid using this schema.
 */
export const RequiredAssociationSchema: SchemaDefinitionProperty<Association> = {
  ...AssociationSchema,
  required: true
}

/**
 * Schema definition for {@link RepeatCycle}
 */
export const RepeatCycleSchema: SchemaDefinitionProperty<RepeatCycle> = {
  type: {
    unit: {type: String, enum: TimeUnits, required: true},
    unitDuration: {type: Number, required: true},
    endOfCycle: {type: Date, required: true},
    pause: {type: Boolean, required: true},
  }
}

/**
 * Schema definition for {@link RepeatCycle} that also includes a REQUIRED field. Where possible (inside arrays),
 * avoid using this schema.
 */
export const RequiredRepeatCycleSchema: SchemaDefinitionProperty<RepeatCycle> = {
  ...RepeatCycleSchema,
  required: true
}

/**
 * Schema definition for {@link DbObject}
 */
export const DbObjectSchema: SchemaDefinition<DbObject> = {
  name: {type: String, required: true},
  fomVersion: {type: String, required: true}
}