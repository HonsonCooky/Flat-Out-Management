import {EntityAndRole, FOMObjectWithLinks, FOMObjectTimeStamped, FOMObjectWithName} from "./_FOMObjects";
import {Types} from "mongoose";

export interface ChoreConfig extends FOMObjectWithLinks {
  choresAutoFill: boolean,
  choresLoop: boolean,
  predictions: Types.ObjectId[]
}

export interface Group extends FOMObjectWithName, FOMObjectTimeStamped {
  password: string,
  users: EntityAndRole[],
  chores: ChoreConfig,
  messages: Types.ObjectId,
  lists: Types.ObjectId[]
}