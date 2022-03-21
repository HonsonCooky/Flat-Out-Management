import bcrypt from "bcryptjs";
import {IFomController} from "../../../../Flat-Out-Interfaces/interfaces/IFomController";
import {env} from "../../config/Config";
import {IFomJwtContract} from "../../../../Flat-Out-Interfaces/interfaces/IFomJwtContract";
import jwt from "jsonwebtoken";

/**
 * SALT AND HASH: Salt and hash a given input
 * @param input
 */
export function saltAndHash(input: string): string | null {
  if (!input) return null
  return bcrypt.hashSync(input, bcrypt.genSaltSync())
}

/**
 * COMPARE HASHES: Validate that a given string 'a' hashes into 'b'.
 * @param a
 * @param b
 */
export function compareHashes(a?: string, b?: string): boolean {
  if (!a || !b) return false
  return bcrypt.compareSync(a, b)
}


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