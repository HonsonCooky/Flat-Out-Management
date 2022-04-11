import {SchemaDefinition} from "mongoose";
import {IFomComponent} from "flat-out-interfaces";
import {FOM_ASSOCIATION, FOM_UI_NAME, FOM_VERSION} from "./FomSchemaDefinitionProperties";

/**
 * COMPONENT SCHEMA DEF: Translates the IFomComponent interface into a schema definition.
 */
export const FomComponentSchemaDef: SchemaDefinition<IFomComponent> = {
  uiName: FOM_UI_NAME,
  password: String,
  fomVersion: FOM_VERSION,
  parents: [FOM_ASSOCIATION],
  children: [FOM_ASSOCIATION],
}