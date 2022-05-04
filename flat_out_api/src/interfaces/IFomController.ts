import {Types} from "mongoose";
import {IFomComponent} from "./IFomComponent";

/**
 * Outlines a document, which is directly controlled by a user
 */
export interface IFomController extends Omit<IFomComponent, "parents"> {
  name: string,
  password: string,
  dynUuid: Types.ObjectId
}