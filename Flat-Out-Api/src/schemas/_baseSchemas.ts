import {
  DocModelAndRoleType,
  DocName,
  Id,
  Password,
  UiName,
  Version
} from "./_schemaTypes";

export const FOMNodeSchema = {
  docName: DocName,
  uiName: UiName,
  fomVersion: Version,
  associations: [DocModelAndRoleType],
}

export const FOMProtectedNodeSchema = {
  ...FOMNodeSchema,
  uuid: Id,
  password: Password
}