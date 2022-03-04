import {Types} from "mongoose";
import {IFomNode} from "./IFomNode";

export interface IFomController extends IFomNode {
  name: string,
  password: string,
  dynUuid: Types.ObjectId
}