import envConfig from "../config/EnvConfig";
import {IFomDoc} from "../interfaces/FomObjects";
import {models} from "mongoose";
import {ModelEnum} from "../interfaces/GlobalEnums";

export function docRegister(type: ModelEnum, body: any): IFomDoc {
  return new models[type]({
    uiName: body.uiName ?? body.docName,
    fomVersion: envConfig.version,
    readAuthLevel: body.readAuthLevel,
    writeAuthLevel: body.writeAuthLevel
  })
}