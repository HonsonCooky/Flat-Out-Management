import {SchemaDefinition, SchemaDefinitionProperty, Types} from "mongoose";
import {DbObject} from "../interfaces/db-object";
import {Association, ModelType, RoleType} from "../interfaces/association";

/**
 * Schema Definition for Association
 */
export const FOM_ASSOCIATION: SchemaDefinitionProperty<Association> = {
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
  }
}

/**
 * Translates the IFomComponent interface into a schema definition.
 */
export const FomDbObject: SchemaDefinition<DbObject> = {
  fomVersion: {
    type: String,
    required: true
  }
}