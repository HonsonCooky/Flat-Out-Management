import {ModelEnum} from "../../interfaces/FomEnums";
import {models} from "mongoose";
import {compareHashes} from "./AuthPartials";
import {IFomController} from "../../interfaces/IFomController";
import {IFomJwtContract} from "../../interfaces/IFomJwtContract";
import {Request} from "express";

/**
 * COMPONENT TYPE FROM URL: Get the ModelEnum, which is embedded into the URL.
 * @param req
 */
export function controllerTypeFromUrl(req: Request): ModelEnum {
  return <ModelEnum>req.params.controller
}

/**
 * UNAME PASS AUTH: Authenticate something with a username and password combination
 * @param type
 * @param body
 * @constructor
 */
export async function unamePassAuth(type: ModelEnum, body: any): Promise<IFomController> {
  let controller: IFomController | null = await models[type].findOne({name: body.name})
  if (!controller) throw new Error(`400: Unable to find user ${body.name}`)
  if (!compareHashes(body.password, controller.password)) throw new Error(`400: Invalid password`)
  return controller
}

/**
 * JWT AUTH: Authenticate something with a JWT
 * @constructor
 */
export async function jwtAuth(type: ModelEnum, jwt: IFomJwtContract): Promise<IFomController> {
  let controller: IFomController | null = await models[type].findOne({dynUuid: jwt.val})
  if (!controller) throw new Error(`400: Invalid JWT`)
  return controller
}