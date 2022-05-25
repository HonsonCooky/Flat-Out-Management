import {SchemaDefinition, SchemaDefinitionProperty, Types} from "mongoose";
import {DbEntity, UiComponent} from "../../interfaces/entities/db-entity";


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


export const DbEntitySchema: SchemaDefinition<DbEntity> = {}