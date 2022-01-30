import {connection, Schema} from "mongoose";
import {ModelType, RoleEnum} from "../_Interfaces";

export const missingStr = (item: string) => `Missing ${item}`

// ID: A unique means of identifying an external document
export const Id = (ref: ModelType) => {
  return {
    type: Schema.Types.ObjectId,
    sparse: true,
    ref: ref,
    validate: async (val: any) => {
      return (await connection.db.collection(ref).countDocuments({_id: val})) === 1
    }
  }
}

// Name: Non-unique means of representing the user
export const Name = {
  type: String,
  required: [true, missingStr('Name')],
  minLength: 3,
  maxLength: 20,
  trim: true
}

// Password: Not unique, else Hash+Salt doesn't work
export const Password = {
  type: String,
  required: [true, missingStr('Password')],
  minLength: 12,
}

// Session: A means of authentication without need for name and password, must be unique
export const Session = {
  type: String,
  unique: true,
  sparse: true
}

// Date: For future planning and automatically informing the group of your absence
export const DateFromToday = {
  type: Date,
  min: Date.now()
}

// Roles: A level of authority for a user in a group
export const Role = {
  type: String,
  enum: RoleEnum,
  default: RoleEnum.JOIN_REQ
}

// Default boolean to true
export const DefaultTrue = {
  type: Boolean,
  default: true,
}
// Entity and Role (associations between groups and users, with their given roles)
export const EntityAndRole = (ref: ModelType) => new Schema({
  entity: Id(ref),
  role: Role,
})