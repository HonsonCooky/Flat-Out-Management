import {ModelEnum} from "../../interfaces/FomEnums";
import {IFomNode} from "../../interfaces/IFomNode";
import {models} from "mongoose";
import {env} from "../../config/EnvConfig";

export function createNode(type: ModelEnum, body: any): IFomNode {
  return new models[type]({
    uiName: body.uiName ?? body.name,
    fomVersion: env.version,
  })
}