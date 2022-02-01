import {Types} from "mongoose";
import {ModelEnum, RoleEnum} from "./_Enums";

/**
 * AUTHENTICATION: The contract for some authentication request from client.
 */
export type Authentication = {
  identifier: string,
  secret: string,
  refPath: ModelEnum
}

/**
 * ENTITY AND ROLE: A link to some document, where some level of authorization is connected.
 */
export interface EntityRoleAndRef {
  entity: Types.ObjectId,
  role: RoleEnum,
  refPath: ModelEnum
}
