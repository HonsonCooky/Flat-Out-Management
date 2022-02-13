import {model, Schema} from "mongoose";
import {ModelEnum} from "../interfaces/GlobalEnums";
import {DateFromToday} from "../interfaces/SchemaTypes";
import {IFomNode} from "../interfaces/FomObjects";
import {FomNodeSchema} from "./BaseSchemas";


/** ---------------------------------------------------------------------------------------------------------------
 * GROUP SCHEMA:
 * The Group Schema contains an object, which provides access to a group. Is its essence, a group is a hub. A central
 * location for all members of the group (flat). For this
 --------------------------------------------------------------------------------------------------------------- */

export interface IGroup extends IFomNode {
  groupCalendar: Date[]
}

const GroupSchema = new Schema<IGroup>({
  ...FomNodeSchema,
  groupCalendar: [DateFromToday]
}, {timestamps: true})


export const GroupModel = model<IGroup>(ModelEnum.GROUP, GroupSchema)
