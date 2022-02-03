import mongoose, {Schema} from "mongoose";
import {Name, Password, Token} from "./_schemaTypes";
import {ModelEnum} from "../interfaces/_enums";
import {IFOMCollectionDocument} from "../interfaces/_fomObjects";


/** ---------------------------------------------------------------------------------------------------------------
 * GROUP SCHEMA:
 * The Group Schema contains an object, which provides access to a group. Is its essence, a group is a hub. A central
 * location for all members of the group (flat). For this
 --------------------------------------------------------------------------------------------------------------- */

export interface IGroup extends IFOMCollectionDocument {
  password: string,
  tokens: string[],
}

const GroupSchema = new Schema<IGroup>({
  name: Name,
  password: Password,
  tokens: [Token],

}, {timestamps: true})


export const GroupModel = mongoose.model<IGroup>(ModelEnum.Groups, GroupSchema)
