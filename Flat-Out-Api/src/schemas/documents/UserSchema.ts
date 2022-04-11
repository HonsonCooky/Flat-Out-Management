import {model, Schema} from "mongoose";
import {FomControllerSchemaDef} from "../util/FomControllerSchemaDef";
import {FOM_COLOR_ASSOCIATION, FOM_EVENT} from "../util/FomSchemaDefinitionProperties";
import {IFomUser} from "../../interfaces/IFomUser";
import {ModelType} from "../../interfaces/IFomEnums";


/**
 * USER SCHEMA: Translates the IFomUser interface into a mongoose.Schema.
 * User objects are used to maintain information about the user.
 *
 * - outOfFlatDates: IFomEvents which detail information to maintain the users itinerary
 */
const UserSchema = new Schema<IFomUser>({
  ...FomControllerSchemaDef,
  outOfFlatDates: [FOM_EVENT],
  colorAssociation: FOM_COLOR_ASSOCIATION
}, {timestamps: true})

export const UserModel = model<IFomUser>(ModelType.USER, UserSchema)