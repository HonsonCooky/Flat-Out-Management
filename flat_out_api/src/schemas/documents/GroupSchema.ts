import {model, Schema} from "mongoose";
import {FomComponentSchemaDef} from "../util/FomComponentSchemaDef";
import {FOM_EVENT, FOM_NAME, FOM_PASSWORD} from "../util/FomSchemaDefinitionProperties";
import {IFomGroup} from "../../interfaces/IFomGroup";
import {ModelType} from "../../interfaces/IFomEnums";


/**
 * Translates the IFomGroup interface into a mongoose.Schema
 * Group objects are used to maintain information about a group.
 *
 * - UiName: Overwrites uiName such that it has to be unique.
 * - Password: Overrides password such that it is mandatory.
 * - groupCalendar: Maintains a record of public facing events from each user. Such that the rest of the group knows
 * each user's itinerary.
 */
const GroupSchema = new Schema<IFomGroup>({
  ...FomComponentSchemaDef,
  uiName: FOM_NAME,
  password: FOM_PASSWORD,
  groupCalendar: [FOM_EVENT]
}, {timestamps: true})

export const GroupModel = model<IFomGroup>(ModelType.GROUP, GroupSchema)