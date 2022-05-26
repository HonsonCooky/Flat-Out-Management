import {SchemaDefinition, SchemaDefinitionProperty, Types} from "mongoose";
import {DbEntity, UiComponent} from "../../interfaces/entities/db-entity";
import {AssociationSchema, DbObjectSchema} from "../fom-db-objects";


/**
 * Schema definition for {@link UiComponent}
 */
const UiComponentSchema: SchemaDefinitionProperty<UiComponent> = {
  name: {type: String, required: true},
  color: {type: String, required: true},
  avatar: Types.ObjectId,
  required: true
}

/**
 * Schema definition for {@link DbEntity}
 */
export const DbEntitySchema: SchemaDefinition<DbEntity> = {
  ...DbObjectSchema,
  name: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  jwtUuid: {type: Types.ObjectId, required: true, unique: true},
  ui: UiComponentSchema,
  calendar: AssociationSchema,
  tables: [AssociationSchema]
}