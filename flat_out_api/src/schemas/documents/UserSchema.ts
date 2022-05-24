import {model, Schema} from "mongoose";
import {FomControllerSchemaDef} from "../util/FomControllerSchemaDef";
import {FOM_COLOR_ASSOCIATION, FOM_EVENT} from "../util/FomSchemaDefinitionProperties";
import {IFomUser} from "../../interfaces/IFomUser";
import {ModelType} from "../../interfaces/IFomEnums";


/**
 * Translates the IFomUser interface into a mongoose.Schema.
 * User objects are used to maintain information about the user.
 *
 * - outOfFlatDates: IFomEvents which detail information to maintain the users itinerary
 * - colorAssociation: Each user needs some color associated with them for the front end ui
 */
const UserSchema = new Schema<IFomUser>({
  ...FomControllerSchemaDef,
  calendar: [FOM_EVENT],
  color: FOM_COLOR_ASSOCIATION
}, {timestamps: true})

export const UserModel = model<IFomUser>(ModelType.USER, UserSchema)