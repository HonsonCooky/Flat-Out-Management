import {compareSync, genSaltSync, hashSync} from "bcryptjs";
import {sign} from "jsonwebtoken"
import {CONFIG} from "../../config";
import {DbEntity} from "../../interfaces/entities/db-entity";
import {ModelType} from "../../interfaces/association";
import {JwtContract} from "../../interfaces/utils/jwt-contract";

/**
 * Salt and hash a given input
 * @param input
 */
export function saltAndHash(input: string): string | null {
  if (!input) return null
  return hashSync(input, genSaltSync())
}

/**
 * Validate that a given string 'a' hashes into 'b'.
 * @param a
 * @param b
 */
export function compareHashes(a?: string, b?: string): boolean {
  if (!a || !b) return false
  return compareSync(a, b)
}


/**
 * Take the dynamic jwt uuid from some entity, plus that entities model, and wrap it into a JWT
 * @param entity
 * @param model
 * @param expiresIn
 */
export function signJWT(entity: DbEntity, model: ModelType, expiresIn: string = CONFIG.token.expirationDays): string {
  if (!entity) throw new Error(`500: Unable to sign a JWT without some content`)

  let payload: JwtContract = {
    jwtUuid: entity.jwtUuid,
    model,
  }

  let options: any = {
    issuer: CONFIG.token.issuer,
    algorithm: 'HS256',
    expiresIn: expiresIn + 'd'
  }

  return 'Bearer ' + sign(payload, CONFIG.token.secret, options)
}