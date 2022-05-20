import {Schema, SchemaDefinition} from "mongoose";
import {FOM_ASSOCIATION, FOM_UI_NAME, FOM_VERSION} from "./FomSchemaDefinitionProperties";
import {IFomDbObject} from "../../interfaces/IFomDbObject";

/**
 * Translates the IFomComponent interface into a schema definition.
 */
export const FomDbObject: SchemaDefinition<IFomDbObject> = {
  uiName: FOM_UI_NAME,
  password: String,
  fomVersion: FOM_VERSION,
  avatar: Schema.Types.ObjectId,
  children: [FOM_ASSOCIATION],
}