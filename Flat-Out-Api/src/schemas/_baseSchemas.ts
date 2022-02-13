import {DocModelAndRoleType, DocName, Password, RoleType, UiName, UUID, Version} from "./_schemaTypes";

const FomBaseSchema = {
  uiName: UiName,
  associations: [DocModelAndRoleType],
  fomVersion: Version,
}

export const FomControllerSchema = {
  ...FomBaseSchema,
  docName: DocName,
  password: Password,
  uuid: UUID
}

export const FomCollectiveSchema = {
  ...FomBaseSchema,
  authLevel: RoleType
}