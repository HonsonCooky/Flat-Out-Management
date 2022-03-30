import {model, Schema} from "mongoose";
import {FomControllerSchemaDef} from "../util/FomControllerSchemaDef";
import {FOM_EVENT} from "../util/FomSchemaDefinitionProperties";
import {ModelType, IFomUser} from "flat-out-interfaces";


/** ---------------------------------------------------------------------------------------------------------------
 * USER SCHEMA:
 * The User Schema is an aggregate of information on some user. The normal information is collected. Name, Email,
 * Password. Each user will be associated to some Group (their flat), and may contain several lists. Groups
 * and Lists are associated by some identifying string. That string will find the Group/List in question.
 --------------------------------------------------------------------------------------------------------------- */

const UserSchema = new Schema<IFomUser>({
  ...FomControllerSchemaDef,
  outOfFlatDates: [FOM_EVENT]
}, {timestamps: true})

export const UserModel = model<IFomUser>(ModelType.USER, UserSchema)