import {Types} from "mongoose";
import {ModelEnum, RoleEnum} from "./_enums";

/**
 * ENTITY AND ROLE: A link to some document, where some level of authorization is connected.
 */
export interface DocRoleAndModel {
  doc: Types.ObjectId,
  role: RoleEnum,
  docModel: ModelEnum
}