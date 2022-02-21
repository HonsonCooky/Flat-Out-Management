import {
  CacheType,
  DefaultAdmin,
  DefaultFlatmate,
  DocModelAndRoleType,
  DocName,
  Password,
  UiName,
  UUID,
  Version
} from "../interfaces/SchemaTypes";
import {SchemaDefinition} from "mongoose";
import {IFomComponent, IFomController} from "../interfaces/FomObjects";

export const FomComponentSchema: SchemaDefinition<IFomComponent> = {
  docName: DocName,
  password: Password,
  associations: [DocModelAndRoleType],
  uiName: UiName,
  fomVersion: Version,
  readAuthLevel: DefaultFlatmate,
  writeAuthLevel: DefaultAdmin,
}

export const FomControllerSchema: SchemaDefinition<IFomController> = {
  uuid: UUID,
  cache: [CacheType],
  ...FomComponentSchema
}