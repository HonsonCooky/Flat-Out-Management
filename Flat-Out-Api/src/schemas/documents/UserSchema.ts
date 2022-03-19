import {model, Schema} from "mongoose";
import {ModelEnum} from "../../interfaces/FomEnums";
import {FomControllerSchemaDef} from "../util/FomControllerSchemaDef";
import {IFomController} from "../../interfaces/IFomController";
import {IFomEvent} from "../../interfaces/IFomEvent";
import {FOM_EVENT} from "../util/FomSchemaDefinitionProperties";


/** ---------------------------------------------------------------------------------------------------------------
 * USER SCHEMA:
 * The User Schema is an aggregate of information on some user. The normal information is collected. Name, Email,
 * Password. Each user will be associated to some Group (their flat), and may contain several lists. Groups
 * and Lists are associated by some identifying string. That string will find the Group/List in question.
 --------------------------------------------------------------------------------------------------------------- */
export interface IUser extends IFomController {
  outOfFlatDates: IFomEvent[]
}

const UserSchema = new Schema<IUser>({
  ...FomControllerSchemaDef,
  outOfFlatDates: [FOM_EVENT]
}, {timestamps: true})

export const UserModel = model<IUser>(ModelEnum.USER, UserSchema)