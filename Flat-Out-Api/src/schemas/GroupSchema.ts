import {model, Schema} from "mongoose";
import {ModelEnum} from "../interfaces/_enums";
import {IFomProtectDoc} from "../interfaces/_fomObjects";
import {FOMProtectedNodeSchema} from "./_baseSchemas";
import {DateFromToday} from "./_schemaTypes";


/** ---------------------------------------------------------------------------------------------------------------
 * GROUP SCHEMA:
 * The Group Schema contains an object, which provides access to a group. Is its essence, a group is a hub. A central
 * location for all members of the group (flat). For this
 --------------------------------------------------------------------------------------------------------------- */

export interface IGroup extends IFomProtectDoc {
  groupCalendar: Date[]
}

const GroupSchema = new Schema<IGroup>({
  ...FOMProtectedNodeSchema,
  groupCalendar: [DateFromToday]
}, {timestamps: true})


export const GroupModel = model<IGroup>(ModelEnum.GROUP, GroupSchema)
