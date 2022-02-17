import envConfig from "../config/EnvConfig";
import {IFomDoc} from "../interfaces/FomObjects";
import {models} from "mongoose";
import {ModelEnum} from "../interfaces/GlobalEnums";

/**
 * DOC REGISTER: Create a doc
 * @param type
 * @param body
 */
export function docRegister(type: ModelEnum, body: any): IFomDoc {
  return new models[type]({
    uiName: body.uiName ?? body.docName,
    fomVersion: envConfig.version,
    readAuthLevel: body.readAuthLevel,
    writeAuthLevel: body.writeAuthLevel
  })
}

/**
 * DOC UPDATE: Update the potential contents of a doc
 * @param doc
 * @param body
 */
export function docUpdate(doc: IFomDoc, body: any): void {
  doc.uiName = body.uiName ?? doc.uiName
  doc.fomVersion = envConfig.version
  doc.readAuthLevel = body.readAuthLevel ?? doc.readAuthLevel
  doc.writeAuthLevel = body.writeAuthLevel ?? doc.writeAuthLevel
}

/**
 * STRING TO MODEL: Convert a string to a ModelEnum.
 * @param str
 */
export function strToModel(str: String): ModelEnum {
  if (!Object.values(ModelEnum).includes(<ModelEnum>str)) throw new Error(`400: Invalid model type provided`)
  return <ModelEnum>str
}