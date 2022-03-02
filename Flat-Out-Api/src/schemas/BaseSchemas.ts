import {
  CacheObjectType,
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
  cache: [CacheObjectType],
  cacheUpdateRequired: {type: Boolean, default: false}
}

export const FomControllerSchema: SchemaDefinition<IFomController> = {
  uuid: UUID,
  ...FomComponentSchema
}