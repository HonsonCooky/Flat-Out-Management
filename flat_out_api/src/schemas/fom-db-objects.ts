import {SchemaDefinition, SchemaDefinitionProperty, Types} from "mongoose";
import {DbObject} from "../interfaces/db-object";
import {Association, ModelType, RoleType} from "../interfaces/association";
import {RepeatCycle} from "../interfaces/non-entities/repeat";

/**
 * Schema definition for {@link Association}
 */
export const AssociationSchema: SchemaDefinitionProperty<Association> = {
  ref: {
    type: Types.ObjectId,
    required: true,
  },
  model: {
    type: String,
    enum: ModelType,
    required: true,
  },
  role: {
    type: String,
    enum: RoleType,
    required: true
  },
  value: {
    type: String,
    required: true
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
export const RepeatCycleSchema: SchemaDefinitionProperty = {}

/**
 * Schema definition for {@link DbObject}
 */
export const DbObjectSchema: SchemaDefinition<DbObject> = {
  fomVersion: {type: String, required: true}
}