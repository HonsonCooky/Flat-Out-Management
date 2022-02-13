import {ModelEnum} from "../interfaces/GlobalEnums";
import {IFomController, IFomDoc, IFomNode} from "../interfaces/FomObjects";
import {models, Types} from "mongoose";
import envConfig from "../config/EnvConfig";
import {saltAndHash} from "./AuthFuncs";

/** -----------------------------------------------------------------------------------------------------------------
 * REGISTER
 -----------------------------------------------------------------------------------------------------------------*/

export function docRegister(body: any, type: ModelEnum): IFomDoc {
  return new models[type]({
    uiName: body.uiName,
    fomVersion: envConfig.version,
    readAuthLevel: body.readAuthLevel,
    writeAuthLevel: body.writeAuthLevel
  }) as IFomDoc
}

export function nodeRegister(body: any, type: ModelEnum): IFomNode {
  let node = docRegister(body, type) as IFomNode
  node.docName = body.docName
  node.password = saltAndHash(body.password)
  node.associations = []
  return node
}

export function controllerRegister(body: any, type: ModelEnum): IFomController {
  let controller = nodeRegister(body, type) as IFomController
  controller.uuid = new Types.ObjectId()
  return controller
}