import {saltAndHash} from "../Util/Crypto";
import {secret} from "../index";

/**
 * SAVE: Saves all updated information about user (also calls validation middleware).
 * @param document: Instance of MongoDB user
 * @param snhPassword: Does the password need to be salt and hashed
 */
export async function save(document: any, snhPassword: boolean): Promise<any> {
  // Update the user's session token (allowing for a new automatic login)
  if (snhPassword && document.password) document.password = saltAndHash(document.password)
  document.sessionToken = saltAndHash(secret)

  // Save the updated user to MongoDB, and return a safe version of the user object.
  await document.save()
  return document
}

/**
 * SANITIZE: Remove the stored password from the user. Sanitizing for client consumption.
 * @param document: Instance of MongoDB user
 */
export function sanitize(document: any) {
  const {password, ...sanitized} = document._doc
  return sanitized
}

