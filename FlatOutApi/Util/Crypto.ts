import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import {Tag} from "./Constants";
import {secret} from "../index";
import {v4} from 'uuid';

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
  return tag + "-" + v4()
}

export async function authenticateToken(token: string){

}

export function generateAccessToken(name: string){
  if (!name) throw new Error('400: Invalid input for access token')
  return jwt.sign(name, secret)
}
