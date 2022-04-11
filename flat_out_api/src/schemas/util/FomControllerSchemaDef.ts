import {SchemaDefinition} from "mongoose";
import {FOM_DYNAMIC_UUID, FOM_NAME, FOM_PASSWORD} from "./FomSchemaDefinitionProperties";
import {FomComponentSchemaDef} from "./FomComponentSchemaDef";
import {IFomController} from "../../interfaces/IFomController";

const {parents, ...FomDocumentSchemaDef} = FomComponentSchemaDef
export const FomControllerSchemaDef: SchemaDefinition<IFomController> = {
  ...FomDocumentSchemaDef,
  name: FOM_NAME,
  password: FOM_PASSWORD,
  dynUuid: FOM_DYNAMIC_UUID,
}