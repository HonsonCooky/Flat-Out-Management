import {SchemaDefinition} from "mongoose";
import {FOM_DYNAMIC_UUID, FOM_NAME, FOM_PASSWORD} from "./FomSchemaDefinitionProperties";
import {IFomController} from "../../interfaces/IFomController";
import {FomDbObject} from "./FomDbObject";

/**
 * Translates the IFomController into a MongoDB Schema Definition
 */
export const FomControllerSchemaDef: SchemaDefinition<IFomController> = {
  ...FomDbObject,
  name: FOM_NAME,
  password: FOM_PASSWORD,
  dynUuid: FOM_DYNAMIC_UUID,
}