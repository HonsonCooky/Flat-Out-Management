import {Schema, SchemaDefinition, SchemaDefinitionProperty} from "mongoose";
import {DbEntity, UiComponent} from "../../interfaces/entities/db-entity";
import {AssociationSchema, DbObjectSchema} from "../fom-db-objects";


/**
 * Schema definition for {@link UiComponent}
 */
const UiComponentSchema: SchemaDefinitionProperty<UiComponent> = {
  type: {
    name: {type: String, required: true},
    color: {type: String, required: true},
    avatar: Schema.Types.ObjectId,
  },
  required: true
}

/**
 * Schema definition for {@link DbEntity}
 */
export const DbEntitySchema: SchemaDefinition<DbEntity> = {
  ...DbObjectSchema,
  name: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  jwtUuid: {type: Schema.Types.ObjectId, required: true, unique: true},
  ui: UiComponentSchema,
  calendar: AssociationSchema,
  tables: [AssociationSchema]
}