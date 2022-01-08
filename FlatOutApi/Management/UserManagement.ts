import {UserModel} from "../Schemas/UserSchema";
import {compareHashes, saltAndHash} from "../Util/Crypto";
import {secret} from "../index";
import {FOMAuth, FOMReq} from "./_ManagementTypes";

/** -------------------------------------------------------------------------------------------------------------------
 * HELPERS: Functions which remove duplicate functionality from management methods.
 ------------------------------------------------------------------------------------------------------------------- */

/**
 * GET: Get the user by some form of identifier (name || id)
 * @param auth: FOMAuth (doesn't use secret)
 */
async function get(auth: FOMAuth): Promise<any> {
  let user: any = await UserModel.findOne({id: auth.identifier})
  if (!user) user = await UserModel.findOne({name: auth.identifier})
  if (!user) throw new Error(`400: Cannot find user by given identifier`)
  return user
}

/**
 * VALIDATE: Given a particular instance of user, validate that the provided secret (token || password) matches its
 * counterpart.
 * @param user: Instance of MongoDB user
 * @param auth: FOMAuth (doesn't use identifier)
 */
async function validate(auth: FOMAuth, user: any) {
  let valid = auth.secret === user.sessionToken
  if (!valid) valid = compareHashes(auth.secret, user.password)
  if (!valid) throw new Error(`400: Failed to authenticate user '${user.name}'`)
}

/**
 * AUTHENTICATE: String together the 'get' and 'validate' methods. Ensuring that some provided FOMAuth object
 * contains the correct information. Get back the
 * @param auth: FOMAuth
 */
export async function authenticate(auth: FOMAuth): Promise<any> {
  // Validate incoming message
  if (!auth) throw new Error('400: Missing required authentication information')
  if (!auth.identifier) throw new Error('400: Missing user identifier')
  if (!auth.secret) throw new Error('400: Missing user secret')

  // Get the user from DB, and validate that the shared secret is valid
  let user: any = await get(auth)
  await validate(auth, user)
  return user
}

/**
 * SAVE: Saves all updated information about user (also calls validation middleware).
 * @param user: Instance of MongoDB user
 * @param snhPassword: Does the password need to be salt and hashed
 * @param snhToken: Does the user require a new token
 */
async function save(user: any, snhPassword: boolean, snhToken: boolean): Promise<any> {
  // Update the user's session token (allowing for a new automatic login)
  if (snhPassword) user.password = saltAndHash(user.password)
  if (snhToken) user.sessionToken = saltAndHash(user.id + secret)

  // Save the updated user to MongoDB, and return a safe version of the user object.
  await user.save()
  return user
}

/**
 * SANITIZE: Remove the stored password from the user. Sanitizing for client consumption.
 * @param user: Instance of MongoDB user
 */
function sanitize(user: any) {
  const {password, ...sanitized} = user._doc
  return sanitized
}


/** ----------------------------------------------------------------------------------------------------------------
 * API FUNCTIONS
 ------------------------------------------------------------------------------------------------------------------- */
/**
 * CREATE: Create a User document
 * @param body: User (ID will be overridden)
 */
export async function userCreate(body: FOMReq): Promise<string> {
  // Setup user object
  let user: any = new UserModel(body.msg)
  return sanitize(await save(user, true, true))
}

/**
 * LOGIN: Authenticate, then return a sanitized version of the user
 * @param body
 */
export async function userLogin(body: FOMReq): Promise<any> {
  return sanitize(await save(await authenticate(body.auth), false, true))
}

/**
 * UPDATE: One call, to update the stored user data. Localized computation will dictate if this data is
 * correct. The validation features will catch anything that is blatantly wrong. Other features will depend on
 * client implementations.
 * @param body
 */
export async function userUpdate(body: FOMReq): Promise<any> {
  // Authenticate the updates taking place
  const user = await authenticate(body.auth)
  // Keep the same user object for mongoose 'save' function
  Object.keys(body.msg).forEach(key => user[key] = body.msg[key])
  // Return the updated user, only Salt and Hash the password if it's updated
  return sanitize(await save(user, !!body.msg.password, true))
}