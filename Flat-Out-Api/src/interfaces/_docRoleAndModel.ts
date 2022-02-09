import {Types} from "mongoose";
import {ModelEnum, RoleEnum} from "./_enums";

/**
 * DOC, MODEL AND ROLE: A link from some document to a model WITH a role (level of authorization) associated.
 */
export interface IDocModelAndRole {
  doc: Types.ObjectId,
  docModel: ModelEnum
  role: RoleEnum
}