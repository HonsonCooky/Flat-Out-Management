import {Schema} from "mongoose";
import {ModelEnum, RoleEnum} from "../Interfaces/_Enums";
import {EntityRoleAndRef} from "../Interfaces/_Utils";

/**
 * ID: A fancy Types.ObjectId wrapper
 */
export const Id = {
  type: Schema.Types.ObjectId,
  sparse: true,
  unique: true,
  refPath: ModelEnum,
}

/**
 * NAME: A required string value that represents the shown title of the document.
 */
export const Name = {
  type: String,
  minLength: 3,
  maxLength: 20,
  trim: true,
  required: [true, `Missing 'Name'`]
}

/**
 * PASSWORD: A required string value that represents the secret that enables authentication to some document
 * information.
 */
export const Password = {
  type: String,
  minLength: 12,
  required: [true, `Missing 'Password'`]
}

/**
 * SESSION: A string that represents a secret between the Server and the Client. Knowing this secret, enables
 * automatic login.
 */
export const Token = {
  type: String,
  sparse: true,
  unique: true,
  required: [true, "Missing 'DeviceId'"]
}
/**
 * DATE FROM TODAY: A Date value, where the minimum value can only be today (anything beforehand is deemed irrelevant)
 */
const getCurrentDay = () => {
  let now = new Date(Date.now())
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())

}

export const DateFromToday = {
  type: Date,
  min: getCurrentDay()
}

/**
 * ROLE: A string value where it can only be one of several enum values.
 */
export const Role = {
  type: String,
  enum: RoleEnum,
  default: RoleEnum.UNDEFINED
}

/**
 * MODEL TYPE: An enum used to define the type of model that something is linked to
 */
export const DynamicRef = {
  type: String,
  enum: ModelEnum,
  default: undefined
}

/**
 * DEFAULT TRUE: A boolean value, where it's true by default (without interaction)
 */
export const DefaultTrue = {
  type: Boolean,
  default: true,
}

/**
 * ENTITY ROLE AND REF TYPE: A tuple, connecting some link to a document, with a reference and role (which can be
 * RoleEnum.UNDEFINED)
 */
export const EntityRoleAndRefType = new Schema<EntityRoleAndRef>({
  entity: Id,
  role: Role,
  refPath: DynamicRef
})