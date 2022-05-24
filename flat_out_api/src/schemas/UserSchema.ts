import {model, Schema, Types} from "mongoose";
import {FomUser} from "../interfaces/entities/FomUser";
import {ModelType} from "../interfaces/Association";
import {FomDbObject} from "./FomDbObjects";


/**
 * Translates the FomUser interface into a mongoose.Schema.
 * User objects are used to maintain information about the user.
 *
 * - outOfFlatDates: IFomEvents which detail information to maintain the users itinerary
 * - colorAssociation: Each user needs some color associated with them for the front end ui
 */
const UserSchema = new Schema<FomUser>({
  ...FomDbObject,
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  jwtUuid: {
    type: Types.ObjectId,
    required: true,
    unique: true,
  },
}, {timestamps: true})

export const UserModel = model(ModelType.USER, UserSchema)