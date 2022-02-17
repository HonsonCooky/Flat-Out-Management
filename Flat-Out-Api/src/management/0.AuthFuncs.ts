import bcrypt from "bcryptjs";
import env from "../config/EnvConfig";
import jwt from "jsonwebtoken";
import {IFomController, JwtAuthContract} from "../interfaces/FomObjects";
import _logger from "../config/Logger";


/** -----------------------------------------------------------------------------------------------------------------
 * CRYPTO:
 * Crypto functions to provide some UUID, hashing and salting, also validation of hashes.
 ----------------------------------------------------------------------------------------------------------------- */
export function saltAndHash(input: string): string {
  if (!input) throw new Error("400: Invalid salt and hash input")
  return bcrypt.hashSync(input, bcrypt.genSaltSync())
}

export function compareHashes(nonHashed: string, hashed: string): boolean {
  if (!nonHashed || !hashed) return false
  return bcrypt.compareSync(nonHashed, hashed)
}

export function signJWT(doc: IFomController, expiresIn: string = env.token.expirationDays): string {
  if (!doc.uuid) throw new Error(`500: Doc doesn't have an UUID. Can't sign without`)

  let payload: JwtAuthContract = {
    uuid: doc.uuid
  }

  let options: any = {
    issuer: env.token.issuer,
    algorithm: 'HS256',
    expiresIn: expiresIn + 'd'
  }

  _logger.info(`Attempting to sign token for "${doc.docName}"`)
  return jwt.sign(payload, env.token.secret, options)
}
