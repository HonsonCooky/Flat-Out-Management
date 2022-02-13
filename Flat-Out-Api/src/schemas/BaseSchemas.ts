import {
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
import {IFomController, IFomDoc, IFomNode} from "../interfaces/FomObjects";

export const FomDocSchema: SchemaDefinition<IFomDoc> = {
  uiName: UiName,
  fomVersion: Version,
  readAuthLevel: DefaultFlatmate,
  writeAuthLevel: DefaultAdmin,
}

export const FomNodeSchema: SchemaDefinition<IFomNode> = {
  ...FomDocSchema,
  docName: DocName,
  password: Password,
  associations: [DocModelAndRoleType],
}

export const FomControllerSchema: SchemaDefinition<IFomController> = {
  ...FomDocSchema,
  uuid: UUID
}