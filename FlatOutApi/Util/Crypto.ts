import bcrypt from "bcryptjs";
import {Tag} from "./Constants";
import {randomUUID} from "crypto";

/** -----------------------------------------------------------------------------------------------------------------
 * CRYPTO:
 * Crypto functions to provide some UUID, hashing and salting, also validation of hashes.
 ----------------------------------------------------------------------------------------------------------------- */
export function saltAndHash(input: string): string {
  if (!input) throw new Error("400: Invalid salt and hash input")
  return bcrypt.hashSync(input, bcrypt.genSaltSync())
}

export function compareHashes(nonHash: string, hash: string): boolean {
  return bcrypt.compareSync(nonHash, hash)
}

export function generateIdWithTag(tag: Tag): string {
  return tag + "-" + randomUUID()
}