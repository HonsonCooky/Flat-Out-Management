import {ModelEnum} from "../../interfaces/FomEnums";
import {IFomNode} from "../../interfaces/IFomNode";
import {models} from "mongoose";
import {env} from "../../config/EnvConfig";

/**
 * CREATE NODE: Create a node object (bare-bones object in MONGODB)
 * @param type
 * @param body
 */
export function nodeCreate(type: ModelEnum, body: any): IFomNode {
  return new models[type]({
    uiName: body.uiName ?? body.name,
    fomVersion: env.version,
  })
}