import {SchemaDefinition} from "mongoose";
import {IFomController} from "flat-out-interfaces";
import {FOM_DYNAMIC_UUID, FOM_NAME, FOM_PASSWORD} from "./FomSchemaDefinitionProperties";
import {FomComponentSchemaDef} from "./FomComponentSchemaDef";

const {parents, ...FomDocumentSchemaDef} = FomComponentSchemaDef
export const FomControllerSchemaDef: SchemaDefinition<IFomController> = {
  ...FomDocumentSchemaDef,
  name: FOM_NAME,
  password: FOM_PASSWORD,
  dynUuid: FOM_DYNAMIC_UUID,
}