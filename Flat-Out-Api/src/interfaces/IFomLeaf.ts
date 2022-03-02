import {Document, Types} from "mongoose";
import {IFomAssociation} from "./IFomAssociation";

/**
 * FOM DOC: Every document in the MongoDB database will have these outlining features
 */
export interface IFomLeaf extends Document<Types.ObjectId> {
  _id: Types.ObjectId, // Hidden
  _doc: any,
  uiName: string,
  fomVersion: string,
  parents: IFomAssociation[],
  createdAt: Date,
  updatedAt: Date,
}