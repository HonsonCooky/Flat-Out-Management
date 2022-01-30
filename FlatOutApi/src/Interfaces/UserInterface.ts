import {EntityAndRole, FOMObjectTimeStamped, FOMObjectWithName} from "./_FOMObjects";
import {Types} from "mongoose";

export interface User extends FOMObjectWithName, FOMObjectTimeStamped {
  password: string,
  sessionToken: string,
  groups: EntityAndRole[],
  lists: Types.ObjectId[],
  onLeave: Date[]
}