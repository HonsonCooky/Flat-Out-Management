import {IFomAssociation} from "./IFomAssociation";
import {Document, Types} from "mongoose";

export interface IFomDbObject extends Document<Types.ObjectId> {
  _id: Types.ObjectId,
  uiName: string,
  password?: string,
  fomVersion: string,
  avatar?: Types.ObjectId,
  children: IFomAssociation[],
  createdAt: Date,
  updatedAt: Date
}