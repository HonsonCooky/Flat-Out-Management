import {Types} from "mongoose";
import {IFomComponent} from "./IFomComponent";

export interface IFomController extends Omit<Omit<IFomComponent, "parents">, "password"> {
  name: string,
  password: string,
  dynUuid: Types.ObjectId
}