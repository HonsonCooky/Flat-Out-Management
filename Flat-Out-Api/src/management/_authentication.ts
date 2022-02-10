import bcrypt from "bcryptjs";
import env from "../config/_envConfig";
import jwt from "jsonwebtoken";
import {IFOMProtectedNode} from "../interfaces/_fomObjects";
import _logger from "../config/_logger";
import {IDocModelAndRole} from "../interfaces/_docRoleAndModel";
import {ModelEnum, RoleEnum} from "../interfaces/_enums";


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

export function signJWT(doc: IFOMProtectedNode, type: ModelEnum, role?: RoleEnum): string {
  _logger.info(`Attempting to sign token for "${doc._id}"`)
  if (!doc.uuid) throw new Error(`500: User doesn't have an ID. Can't sign without`)

  let payload: IDocModelAndRole = {
    doc: doc.uuid,
    docModel: type,
    role: role ? role : RoleEnum.UNDEFINED
  }

  let options: any = {
    issuer: env.token.issuer,
    algorithm: 'HS256',
    expiresIn: env.token.expirationDays + 'd'
  }

  return jwt.sign(payload, env.token.secret, options)
}

/** -----------------------------------------------------------------------------------------------------------------
 * VALIDATION:
 * Authentication functions to ensure that actions taken are done in the structured order intended by the API.
 ----------------------------------------------------------------------------------------------------------------- */

