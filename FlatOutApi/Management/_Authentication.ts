import {FOMAuth} from "./_ManagementTypes";
import {compareHashes} from "../Util/Crypto";
import {Model} from "mongoose";

/**
 * GET: Get the user by some form of identifier (name || id)
 * @param auth: FOMAuth (doesn't use secret)
 * @param model
 */
async function get(auth: FOMAuth, model: Model<any>): Promise<any> {
  let document = null
  try {
    await model.findOne({
      $or: [
        {name: auth.identifier},
        {_id: auth.identifier}
      ]
    })
      .exec(function (error, result) {
        if (result) document = result
      })
  } catch (e) {
    
  }
  if (!document) throw new Error(`400: Cannot find user by given identifier`)
  return document
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
  if (!valid) throw new Error(`400: Failed to authenticate user '${document.name}'`)
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