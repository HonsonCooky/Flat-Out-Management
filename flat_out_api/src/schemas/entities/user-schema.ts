import {model, Schema} from "mongoose";
import {FomUser} from "../../interfaces/entities/fom-user";
import {ModelType} from "../../interfaces/association";
import {AssociationSchema} from "../fom-db-objects";
import {DbEntitySchema} from "./db-entity-schema";


/**
 * Translates the FomUser interface into a mongoose.Schema.
 * User objects are used to maintain information about the user.
 *
 * - outOfFlatDates: IFomEvents which detail information to maintain the users itinerary
 * - colorAssociation: Each user needs some color associated with them for the front end ui
 */
const UserSchema = new Schema<FomUser>({
  ...DbEntitySchema,
  groups: [AssociationSchema],
  shouldUpdate: {type: Boolean, required: true}
}, {timestamps: true})

export const UserModel = model(ModelType.USER, UserSchema)