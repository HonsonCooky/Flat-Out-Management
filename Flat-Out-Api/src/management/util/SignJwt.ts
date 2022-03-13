import {IFomController} from "../../interfaces/IFomController";
import {env} from "../../config/Config";
import {IFomJwtContract} from "../../interfaces/IFomJwtContract";
import jwt from "jsonwebtoken";


/**
 * SIGN JWT: Given some value 'val', convert to a JWT (string).
 * @param controller
 * @param expiresIn
 */
export function signJWT(controller: IFomController, expiresIn: string = env.token.expirationDays): string {
  if (!controller) throw new Error(`500: Unable to sign a JWT without some content`)

  let payload: IFomJwtContract = {
    dynUuid: controller.dynUuid
  }

  let options: any = {
    issuer: env.token.issuer,
    algorithm: 'HS256',
    expiresIn: expiresIn + 'd'
  }

  return 'Bearer ' + jwt.sign(payload, env.token.secret, options)
}