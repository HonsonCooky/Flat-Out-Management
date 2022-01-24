import {secret} from "../index";
import {saltAndHash} from "./_Authentication";
import {FOMReq} from "../_Interfaces";

/**
 * SAVE: Saves all updated information about user (also calls validation middleware).
 * @param document: Instance of MongoDB user
 * @param snhPassword: Does the password need to be salt and hashed
 */
export async function save(document: any, snhPassword: boolean = false): Promise<any> {
  if (!document) throw new Error('500: Unable to save an unknown document')

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
  if (!document) throw new Error('500: Unable to sanitize an unknown document')
  const {password, ...sanitized} = document._doc
  return sanitized
}


/**
 * SAFETY DOCUMENTS: Ensure that documents are not updating components that require alternative API calls.
 */

export function safeUpdate(body: FOMReq): any {
  if (!body.content) throw new Error(`400: No content for update`)
  // Remove all fields which should only be updated through some other method (for all schemas)
  const {_id, sessionToken, groups, lists, association, users, joinRequests, chores, messages, ...rest} = body.content
  return rest
}