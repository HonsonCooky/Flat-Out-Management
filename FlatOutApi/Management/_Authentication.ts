import {Authentication} from "./_ManagementTypes";
import {compareHashes} from "../Util/Crypto";
import {Model} from "mongoose";

/**
 * GET: Get the user by some form of identifier (name || id)
 * @param identifier
 * @param model
 */
export async function get(identifier: string, model: Model<any>): Promise<any> {
  let document = await model.findOne({_id: identifier})
  if (!document) throw new Error(`400: Unable to find document '${identifier}'`)
  return document
}

/**
 * VALIDATE: Given a particular instance of user, validate that the provided secret (token || password) matches its
 * counterpart.
 * @param secret
 * @param document: Instance of MongoDB user
 */
async function validate(secret: string, document: any) {
  let valid = secret === document.sessionToken
  if (!valid) valid = compareHashes(secret, document.password)
  if (!valid) throw new Error(`400: Failed to authenticate document '${document.name}'`)
}

/**
 * AUTHENTICATE: String together the 'get' and 'validate' methods. Ensuring that some provided FOMAuth object
 * contains the correct information. Get back the
 * @param auth: FOMAuth
 * @param model
 */
export async function authenticate(auth: Authentication, model: Model<any>): Promise<any> {
  // Validate incoming message
  if (!auth) throw new Error('400: Missing required authentication information')
  if (!auth.identifier) throw new Error('400: Missing identifier')
  if (!auth.secret) throw new Error('400: Missing secret')

  // Get the user from DB, and validate that the shared secret is valid
  let document: any = await get(auth.identifier, model)
  await validate(auth.secret, document)
  return document
}