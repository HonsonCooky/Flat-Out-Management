import {Document, Types} from "mongoose";
import {IFomAssociation} from "./IFomAssociation";
import {IFomImage} from "./IFomImage";

/**
 * Outlines a document, which maintains information for the db.
 */
export interface IFomComponent extends Document<Types.ObjectId> {
  _id: Types.ObjectId,
  uiName: string,
  password?: string,
  fomVersion: string,
  avatar: IFomImage,
  parents: IFomAssociation[],
  children: IFomAssociation[],
  createdAt: Date,
  updatedAt: Date
}