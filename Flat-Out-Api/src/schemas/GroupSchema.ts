import {model, Schema} from "mongoose";
import {ModelEnum} from "../interfaces/_enums";
import {DateFromToday} from "./_schemaTypes";
import {IFomCollective} from "../interfaces/_fomObjects";
import {FomCollectiveSchema} from "./_baseSchemas";


/** ---------------------------------------------------------------------------------------------------------------
 * GROUP SCHEMA:
 * The Group Schema contains an object, which provides access to a group. Is its essence, a group is a hub. A central
 * location for all members of the group (flat). For this
 --------------------------------------------------------------------------------------------------------------- */

export interface IGroup extends IFomCollective {
  groupCalendar: Date[]
}

const GroupSchema = new Schema<IGroup>({
  ...FomCollectiveSchema,
  groupCalendar: [DateFromToday]
}, {timestamps: true})


export const GroupModel = model<IGroup>(ModelEnum.GROUP, GroupSchema)
