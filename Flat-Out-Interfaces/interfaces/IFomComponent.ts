import {Document, Types} from "mongoose";
import {IFomAssociation} from "./IFomAssociation";


export interface IFomComponent extends Document<Types.ObjectId> {
  _id: Types.ObjectId,
  uiName: string,
  password?: string,
  fomVersion: string,
  parents: IFomAssociation[],
  children: IFomAssociation[],
  createdAt: Date,
  updatedAt: Date
}