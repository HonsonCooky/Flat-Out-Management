import {ModelEnum} from "../../interfaces/FomEnums";
import {models} from "mongoose";
import {compareHashes} from "./AuthPartials";
import {IFomController} from "../../interfaces/IFomController";
import {IFomJwtContract} from "../../interfaces/IFomJwtContract";


/**
 * UNAME PASS AUTH: Authenticate something with a username and password combination
 * @param type
 * @param body
 * @constructor
 */
export async function UnamePassAuth(type: ModelEnum, body: any): Promise<IFomController> {
  let controller: IFomController = await models[type].findOne({name: body.name}) as IFomController
  if (!controller) throw new Error(`400: Unable to find user ${body.name}`)
  if (!compareHashes(body.password, controller.password)) throw new Error(`400: Invalid password`)
  return controller
}

/**
 * JWT AUTH: Authenticate something with a JWT
 * @constructor
 */
export async function JwtAuth(type: ModelEnum, jwt: IFomJwtContract): Promise<IFomController> {
  let controller: IFomController = await models[type].findOne({dynUuid: jwt.val}) as IFomController
  if (!controller) throw new Error(`400: Invalid JWT`)
  return controller
}