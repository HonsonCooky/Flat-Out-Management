import bcrypt from "bcryptjs";
import {env} from "../../config/EnvConfig";
import jwt from "jsonwebtoken";
import {IFomJwtContract} from "../../interfaces/IFomJwtContract";

/**
 * SALT AND HASH: Salt and hash a given input
 * @param input
 */
export function saltAndHash(input: string): string {
  if (!input) throw new Error("400: Invalid salt and hash input")
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
 * @param val
 * @param expiresIn
 */
export function signJWT(val: any, expiresIn: string = env.token.expirationDays): string {
  if (!val) throw new Error(`500: Unable to sign a JWT without some content`)

  let payload: IFomJwtContract = {val}

  let options: any = {
    issuer: env.token.issuer,
    algorithm: 'HS256',
    expiresIn: expiresIn + 'd'
  }

  return 'Bearer ' + jwt.sign(payload, env.token.secret, options)
}
