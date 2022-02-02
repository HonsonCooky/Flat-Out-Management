import {Types} from "mongoose";
import {ModelEnum, RoleEnum} from "./_enums";

/**
 * AUTHENTICATION: The contract for some authentication request from client.
 */
export type Authentication = {
  identifier: string,
  secret: string,
  docModel: ModelEnum
}

/**
 * ENTITY AND ROLE: A link to some document, where some level of authorization is connected.
 */
export interface DocRoleAndModel {
  doc: Types.ObjectId,
  role: RoleEnum,
  docModel: ModelEnum
}
