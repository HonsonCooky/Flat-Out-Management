import {IFomDocument} from "../interfaces/IFomDocument";
import {model, Schema} from "mongoose";
import {FomDocumentSchema} from "./util/FomDocumentSchema";
import {ModelEnum} from "../interfaces/FomEnums";


/** ---------------------------------------------------------------------------------------------------------------
 * GROUP SCHEMA:
 * The Group Schema contains an object, which provides access to a group. Is its essence, a group is a hub. A central
 * location for all members of the group (flat). For this
 --------------------------------------------------------------------------------------------------------------- */
export interface IGroup extends IFomDocument {
  groupCalendar: Date[]
}

const GroupSchema = new Schema<IGroup>({
  ...FomDocumentSchema,
  groupCalendar: [Date]
}, {timestamps: true})


export const GroupModel = model<IGroup>(ModelEnum.GROUP, GroupSchema)