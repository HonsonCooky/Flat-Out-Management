import mongoose, {Schema} from "mongoose";
import {Item, ItemSchema} from "./ItemSchema";
import {nameValidator, Update} from "./Validators";


/** ---------------------------------------------------------------------------------------------------------------
 * GROUP SCHEMA:
 * The Group Schema contains an object, which provides access to a group. Is its essence, a group is a hub. A central
 * location for all members of the group (flat). For this
 --------------------------------------------------------------------------------------------------------------- */

export interface Group {
  groupName: string,
  password: string,
  users: string[],
  lists: string[],
  chores: Item[],
  choresAutoFill: boolean,
  choresLoop: boolean,
  createdAt: string,
  updatedAt: string,
}

export type SanitizedGroup = {
  groupName: string,
  users: string[],
  lists: string[],
  chores: Item[],
  choresAutoFill: boolean,
  choresLoop: boolean,
  createdAt: string,
  updatedAt: string,
}


export type UpdateGroup = Omit<Update, 'update'> & { update: Group }

const GroupSchema = new Schema({
  groupName: {
    type: String,
    required: [true, 'Groups require a name'],
    unique: true,
    lowercase: true,
    validate: nameValidator
  },
  password: {type: String, required: [true, 'Groups require a password']},
  // A user can't be in more than one group
  users: {
    type: [{
      type: String,
      unique: true,
      lowercase: true,
    }],
  },
  // A group list cannot span across multiple groups
  lists: {
    type: [{
      type: String,
      lowercase: true,
    }],
    required: [true, 'Groups require AT LEAST an empty list for other lists'],
  },
  chores: {
    type: [ItemSchema],
    required: [true, 'Groups require AT LEAST an empty list for chores'],
  },
  choresAutoFill: {type: Boolean, required: [true, 'Group needs to know whether to auto fill or not']},
  choresLoop: {type: Boolean, required: [true, 'Group needs to know whether to auto fill or not']}
}, {timestamps: true})

export const GroupModel = mongoose.model("Groups", GroupSchema)