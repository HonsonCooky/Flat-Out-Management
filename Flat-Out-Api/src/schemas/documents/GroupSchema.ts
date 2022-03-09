import {IFomComponent} from "../../interfaces/IFomComponent";
import {model, Schema} from "mongoose";
import {FomComponentSchemaDef} from "../util/FomComponentSchemaDef";
import {ModelEnum} from "../../interfaces/FomEnums";
import {EventSchema, ICalendarEvent} from "./EventSchema";
import {FOM_NAME, FOM_PASSWORD} from "../util/FomSchemaDefinitionProperties";


/** ---------------------------------------------------------------------------------------------------------------
 * GROUP SCHEMA:
 * The Group Schema contains an object, which provides access to a group. Is its essence, a group is a hub. A central
 * location for all members of the group (flat). For this
 --------------------------------------------------------------------------------------------------------------- */
export interface IGroup extends IFomComponent {
  groupCalendar: ICalendarEvent[]
}

const GroupSchema = new Schema<IGroup>({
  ...FomComponentSchemaDef,
  uiName: FOM_NAME,
  password: FOM_PASSWORD,
  groupCalendar: [EventSchema]
}, {timestamps: true})

export const GroupModel = model<IGroup>(ModelEnum.GROUP, GroupSchema)