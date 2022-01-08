import {UserModel} from "../Schemas/UserSchema";
import {FOMReq} from "./_ManagementTypes";
import {authenticate} from "./_Authentication";
import {sanitize, save} from "./_Utils";

/**
 * CREATE: Create a User document
 * @param body
 */
export async function userCreate(body: FOMReq): Promise<string> {
  return sanitize(await save(new UserModel(body.msg), true))
}

/**
 * LOGIN: Authenticate, then return a sanitized version of the user
 * @param body
 */
export async function userLogin(body: FOMReq): Promise<any> {
  return sanitize(await save(await authenticate(body.auth, UserModel), false))
}

/**
 * UPDATE: One call, to update the stored user data. Localized computation will dictate if this data is
 * correct. The validation features will catch anything that is blatantly wrong. Other features will depend on
 * client implementations.
 * @param body
 */
export async function userUpdate(body: FOMReq): Promise<any> {
  // Authenticate the updates taking place
  const user = await authenticate(body.auth, UserModel)
  // Keep the same user object for mongoose 'save' function
  Object.keys(body.msg).forEach(key => user[key] = body.msg[key])
  // Return the updated user, only Salt and Hash the password if it's updated
  return sanitize(await save(user, !!body.msg.password))
}