import bcrypt from "bcryptjs";
import jwt, {JwtPayload} from 'jsonwebtoken'
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

export function generateAccessToken(unsignedToken: string): string{
  if (!unsignedToken) throw new Error('400: Invalid param for generating access token')
  return jwt.sign(unsignedToken, secret)
}

export async function decomposeAccessToken(token: string): Promise<string | JwtPayload>{
  if (!token) throw new Error('400: Invalid param for decoding access token')
  return jwt.verify(token, secret)
}
