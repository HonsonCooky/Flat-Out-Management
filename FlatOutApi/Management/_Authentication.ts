import {FOMAuth} from "./_ManagementTypes";
import {compareHashes} from "../Util/Crypto";
import {Model} from "mongoose";

/**
 * GET: Get the user by some form of identifier (name || id)
 * @param auth: FOMAuth (doesn't use secret)
 * @param model
 */
export async function get(auth: FOMAuth, model: Model<any>): Promise<any> {
  try {
    let document = await model.findOne({_id: auth.identifier})
    if (document) return document
  } catch (e) {}
  throw new Error(`400: Unable to find document '${auth.identifier}'`)
}

/**
 * VALIDATE: Given a particular instance of user, validate that the provided secret (token || password) matches its
 * counterpart.
 * @param document: Instance of MongoDB user
 * @param auth: FOMAuth (doesn't use identifier)
 */
async function validate(auth: FOMAuth, document: any) {
  let valid = auth.secret === document.sessionToken
  if (!valid) valid = compareHashes(auth.secret, document.password)
  if (!valid) throw new Error(`400: Failed to authenticate document '${document.name}'`)
}

/**
 * AUTHENTICATE: String together the 'get' and 'validate' methods. Ensuring that some provided FOMAuth object
 * contains the correct information. Get back the
 * @param auth: FOMAuth
 * @param model
 */
export async function authenticate(auth: FOMAuth, model: Model<any>): Promise<any> {
  // Validate incoming message
  if (!auth) throw new Error('400: Missing required authentication information')
  if (!auth.identifier) throw new Error('400: Missing identifier')
  if (!auth.secret) throw new Error('400: Missing secret')

  // Get the user from DB, and validate that the shared secret is valid
  let document: any = await get(auth, model)
  await validate(auth, document)
  return document
}