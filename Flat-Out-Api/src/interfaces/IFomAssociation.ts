import {Types} from "mongoose";
import {ModelEnum, RoleEnum} from "./FomEnums";

/**
 * DOC, MODEL AND ROLE: A tuple that connects some id to it's MongoDB model, and a role
 */
export interface IFomAssociation {
  ref: Types.ObjectId,
  model: ModelEnum
  role: RoleEnum
}