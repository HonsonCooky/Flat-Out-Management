import {EntityAndRole, LinkedDocument, TimeStampedDocument, NamedDocument} from "./_FOMObjects";
import {Types} from "mongoose";

export interface ChoreConfig extends LinkedDocument {
  choresAutoFill: boolean,
  choresLoop: boolean,
  predictions: Types.ObjectId[]
}

export interface Group extends NamedDocument, TimeStampedDocument {
  password: string,
  users: EntityAndRole[],
  chores: ChoreConfig,
  messages: Types.ObjectId,
  lists: Types.ObjectId[]
}