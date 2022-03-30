import {model, Schema} from "mongoose";
import {FomComponentSchemaDef} from "../util/FomComponentSchemaDef";
import {FOM_EVENT, FOM_NAME, FOM_PASSWORD} from "../util/FomSchemaDefinitionProperties";
import {ModelType, IFomGroup} from "flat-out-interfaces";


/** ---------------------------------------------------------------------------------------------------------------
 * GROUP SCHEMA:
 * The Group Schema contains an object, which provides access to a group. Is its essence, a group is a hub. A central
 * location for all members of the group (flat). For this
 --------------------------------------------------------------------------------------------------------------- */
const GroupSchema = new Schema<IFomGroup>({
  ...FomComponentSchemaDef,
  uiName: FOM_NAME,
  password: FOM_PASSWORD,
  groupCalendar: [FOM_EVENT]
}, {timestamps: true})

export const GroupModel = model<IFomGroup>(ModelType.GROUP, GroupSchema)