import {IFomAssociation} from "./IFomAssociation";
import {Document, Types} from "mongoose";


export interface IFomDocument extends Document<Types.ObjectId> {
  _id: Types.ObjectId,
  name: string,
  uiName: string,
  password?: string,
  associations: IFomAssociation[],
  fomVersion: string,
  createdAt: Date,
  updatedAt: Date
}