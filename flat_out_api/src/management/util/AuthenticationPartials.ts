import bcrypt from "bcryptjs";
import {CONFIG} from "../../Config";
import jwt from "jsonwebtoken";
import {IFomController} from "../../interfaces/IFomController";
import {IFomJwtContract} from "../../interfaces/IFomJwtContract";

/**
 * Salt and hash a given input
 * @param input
 */
export function saltAndHash(input: string): string | null {
  if (!input) return null
  return bcrypt.hashSync(input, bcrypt.genSaltSync())
}

/**
 * Validate that a given string 'a' hashes into 'b'.
 * @param a
 * @param b
 */
export function compareHashes(a?: string, b?: string): boolean {
  if (!a || !b) return false
  return bcrypt.compareSync(a, b)
}


/**
 * Given some value 'val', convert to a JWT (string).
 * @param controller
 * @param expiresIn
 */
export function signJWT(controller: IFomController, expiresIn: string = CONFIG.token.expirationDays): string {
  if (!controller) throw new Error(`500: Unable to sign a JWT without some content`)

  let payload: IFomJwtContract = {
    dynUuid: controller.dynUuid
  }

  let options: any = {
    issuer: CONFIG.token.issuer,
    algorithm: 'HS256',
    expiresIn: expiresIn + 'd'
  }

  return 'Bearer ' + jwt.sign(payload, CONFIG.token.secret, options)
}