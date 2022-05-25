import {model, Schema} from "mongoose";
import {FomGroup} from "../../interfaces/entities/fom-group";
import {ModelType} from "../../interfaces/association";


/**
 * Translates the FomGroup interface into a mongoose.Schema
 * Group objects are used to maintain information about a group.
 *
 * - UiName: Overwrites uiName such that it has to be unique.
 * - Password: Overrides password such that it is mandatory.
 * - groupCalendar: Maintains a record of public facing events from each user. Such that the rest of the group knows
 * each user's itinerary.
 */
const GroupSchema = new Schema<FomGroup>({
  //TODO
}, {timestamps: true})

export const GroupModel = model(ModelType.GROUP, GroupSchema)