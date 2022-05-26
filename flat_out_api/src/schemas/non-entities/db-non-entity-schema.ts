import {SchemaDefinition} from "mongoose";
import {DbNonEntity} from "../../interfaces/non-entities/db-non-entity";
import {AssociationSchema, DbObjectSchema, RequiredAssociationSchema} from "../fom-db-objects";

/**
 * Schema definitions for {@link DbNonEntity}
 */
export const DbNonEntitySchema: SchemaDefinition<DbNonEntity> = {
  ...DbObjectSchema,
  owner: RequiredAssociationSchema,
  associations: [AssociationSchema]
}