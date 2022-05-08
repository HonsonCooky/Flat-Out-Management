import {SchemaDefinition} from "mongoose";
import {FOM_ASSOCIATION} from "./FomSchemaDefinitionProperties";
import {IFomComponent} from "../../interfaces/IFomComponent";
import {FomDbObject} from "./FomDbObject";

/**
 * Translates the IFomComponent interface into a schema definition.
 */
export const FomComponentSchemaDef: SchemaDefinition<IFomComponent> = {
  ...FomDbObject,
  parents: [FOM_ASSOCIATION],
}