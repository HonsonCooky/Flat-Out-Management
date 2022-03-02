import {Types} from "mongoose";
import {ModelEnum, RoleEnum} from "./GlobalEnums";

/**
 * DOC, MODEL AND ROLE: A tuple that connects some id to it's MongoDB model, and a role
 */
export interface IFomAssociation {
  doc: Types.ObjectId,
  docModel: ModelEnum
  role: RoleEnum
}