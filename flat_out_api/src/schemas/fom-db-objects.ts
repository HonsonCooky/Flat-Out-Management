import {SchemaDefinition, SchemaDefinitionProperty, Types} from "mongoose";
import {DbObject} from "../interfaces/db-object";
import {UiComponent} from "../interfaces/entities/UiComponent";
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
 * Ui Component outlines the UiComponent interface. Name and Color are required fields, however, avatar is optional
 * to the user, and therefore, optional here.
 */
const FOM_UI_COMPONENT: SchemaDefinitionProperty<UiComponent> = {
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  avatar: {
    type: Types.ObjectId
  }
}

/**
 * Translates the IFomComponent interface into a schema definition.
 */
export const FomDbObject: SchemaDefinition<DbObject> = {
  ui: FOM_UI_COMPONENT,
  fomVersion: {
    type: String,
    required: true
  }
}