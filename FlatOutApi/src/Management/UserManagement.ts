import {UserModel} from "../Schemas/UserSchema";
import {bodyToFomObjects} from "./_Authentication";
import {safeUpdate, sanitize, save} from "./_Utils";
import {FOMReq, FOMRes} from "../Interfaces/UtilInterfaces";

/**
 * CREATE: Create a User document
 * @param body
 */
export async function userCreate(body: FOMReq): Promise<FOMRes> {
  return {
    item: sanitize(await save(new UserModel(safeUpdate(body)), true, true)),
    msg: `Successfully created user`
  }
}

/**
 * LOGIN: Authenticate, then return a sanitized version of the user
 * @param body
 */
export async function userLogin(body: FOMReq): Promise<FOMRes> {
  return {
    item: sanitize(await save((await bodyToFomObjects(body)).user, true)),
    msg: `Successful user login`
  }
}

/**
 * UPDATE: One call, to update the stored user data. Localized computation will dictate if this data is
 * correct. The validation features will catch anything that is blatantly wrong. Other features will depend on
 * client implementations.
 * @param body
 */
export async function userUpdate(body: FOMReq): Promise<FOMRes> {
  let {user: User} = await bodyToFomObjects(body)

  return {
    msg: "Unimplemented"
  }
}

/**
 * DELETE: Remove the user from the DB.
 * @param body
 */
export async function userDelete(body: FOMReq): Promise<FOMRes> {
  const user = await bodyToFomObjects(body)

  // Unlink from other lists and groups

  throw new Error('here')
}