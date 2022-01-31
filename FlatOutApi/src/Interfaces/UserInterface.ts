import {EntityAndRole, TimeStampedDocument, NamedDocument} from "./_FOMObjects";
import {Types} from "mongoose";

export interface User extends NamedDocument, TimeStampedDocument {
  password: string,
  sessionToken: string,
  groups: EntityAndRole[],
  lists: Types.ObjectId[],
  onLeave: Date[]
}