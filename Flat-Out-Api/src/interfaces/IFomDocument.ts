import {IFomAssociation} from "./IFomAssociation";
import {Document, Types} from "mongoose";


export interface IFomDocument extends Document<Types.ObjectId> {
  name: string,
  password?: string,
  associations: IFomAssociation[],
  fomVersion: string,
  createdAt: Date,
  updatedAt: Date
}