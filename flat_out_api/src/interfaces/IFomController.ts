import {Types} from "mongoose";
import {IFomDbObject} from "./IFomDbObject";

/**
 * Outlines a document, which is directly controlled by a user
 */
export interface IFomController extends IFomDbObject {
  name: string,
  password: string,
  dynUuid: Types.ObjectId
}