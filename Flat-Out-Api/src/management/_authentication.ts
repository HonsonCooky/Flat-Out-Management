import {IUser} from "../schemas/UserSchema";
import bcrypt from "bcryptjs";
import envConfig from "../config/EnvrionmentConfig";
import logger from "../config/Logging";
import jwt from "jsonwebtoken";


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

export function signJWT(user: IUser): string {
  logger.info(`Attempting to sign token for ${user._id}`)
  const expiresIn = envConfig.token.expirationDays + 'd'

  return jwt.sign(
    {
      userId: user._id
    },
    envConfig.token.secret,
    {
      issuer: envConfig.token.issuer,
      algorithm: 'HS256',
      expiresIn: expiresIn
    })
}

/** -----------------------------------------------------------------------------------------------------------------
 * VALIDATION:
 * Authentication functions to ensure that actions taken are done in the structured order intended by the API.
 ----------------------------------------------------------------------------------------------------------------- */

