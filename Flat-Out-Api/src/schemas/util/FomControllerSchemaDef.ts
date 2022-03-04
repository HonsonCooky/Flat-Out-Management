import {SchemaDefinition} from "mongoose";
import {IFomController} from "../../interfaces/IFomController";
import {FOM_DYNAMIC_UUID, FOM_NAME, FOM_PASSWORD} from "./FomSchemaDefinitionProperties";
import {FomComponentSchemaDef} from "./FomComponentSchemaDef";

export const FomControllerSchemaDef: SchemaDefinition<IFomController> = {
  ...FomComponentSchemaDef,
  name: FOM_NAME,
  password: FOM_PASSWORD,
  dynUuid: FOM_DYNAMIC_UUID,
}