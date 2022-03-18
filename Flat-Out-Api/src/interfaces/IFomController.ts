import {Types} from "mongoose";
import {IFomComponent} from "./IFomComponent";

export interface IFomController extends Omit<IFomComponent, "parents"> {
  name: string,
  password: string,
  dynUuid: Types.ObjectId
}