import {IFomAssociation} from "./IFomAssociation";
import {Document, Types} from "mongoose";
import {IFomImage} from "./IFomImage";

export interface IFomDbObject extends Document<Types.ObjectId> {
  _id: Types.ObjectId,
  uiName: string,
  password?: string,
  fomVersion: string,
  avatar?: IFomImage,
  children: IFomAssociation[],
  createdAt: Date,
  updatedAt: Date
}