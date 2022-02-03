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
  let timeSinceEpoch = new Date().getTime();
  let expirationTime = timeSinceEpoch + (Number(envConfig.token.expiration) * 100000)
  let expirationTimeSec = Math.floor(expirationTime / 1000)

  logger.info(`Attempting to sign token for ${user.name}`)

  return jwt.sign(
    {
      userId: user._id
    },
    envConfig.token.secret,
    {
      issuer: envConfig.token.issuer,
      algorithm: 'ES256',
      expiresIn: expirationTimeSec
    })
}

/** -----------------------------------------------------------------------------------------------------------------
 * VALIDATION:
 * Authentication functions to ensure that actions taken are done in the structured order intended by the API.
 ----------------------------------------------------------------------------------------------------------------- */

