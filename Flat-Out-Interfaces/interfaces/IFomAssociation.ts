import {Types} from "mongoose";
import {ModelType, RoleType} from "./IFomEnums";

/**
 * DOC, MODEL AND ROLE: A tuple that connects some id to it's MongoDB model, and a role
 */
export interface IFomAssociation {
  ref: Types.ObjectId,
  model: ModelType
  role: RoleType
}