import {SchemaDefinition} from "mongoose";
import {FOM_ASSOCIATION, FOM_AVATAR, FOM_UI_NAME, FOM_VERSION} from "./FomSchemaDefinitionProperties";
import {IFomComponent} from "../../interfaces/IFomComponent";

/**
 * Translates the IFomComponent interface into a schema definition.
 */
export const FomComponentSchemaDef: SchemaDefinition<IFomComponent> = {
  uiName: FOM_UI_NAME,
  password: String,
  fomVersion: FOM_VERSION,
  avatar: FOM_AVATAR,
  parents: [FOM_ASSOCIATION],
  children: [FOM_ASSOCIATION],
}