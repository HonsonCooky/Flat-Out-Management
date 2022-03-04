import {SchemaDefinition} from "mongoose";
import {IFomComponent} from "../../interfaces/IFomComponent";
import {FOM_ASSOCIATION, FOM_UI_NAME, FOM_VERSION} from "./FomSchemaDefinitionProperties";

export const FomComponentSchemaDef: SchemaDefinition<IFomComponent> = {
  uiName: FOM_UI_NAME,
  fomVersion: FOM_VERSION,
  parents: [FOM_ASSOCIATION],
  children: [FOM_ASSOCIATION],
}