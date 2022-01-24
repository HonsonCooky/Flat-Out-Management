import {UserModel} from "../Schemas/UserSchema";
import {authGetDocuments} from "./_Authentication";
import {safeUpdate, sanitize, save} from "./_Utils";
import {FOMReq, FOMRes} from "../_Interfaces";

export async function checkUserIds(user: any) {
  console.log(Object.keys(user._doc).filter((key: string) => key != '_id').map(key => user[key])[0])
}

/**
 * CREATE: Create a User document
 * @param body
 */
export async function userCreate(body: FOMReq): Promise<FOMRes> {
  return {
    item: sanitize(await save(new UserModel(safeUpdate(body)), true)),
    msg: `Successfully created user`
  }
}

/**
 * LOGIN: Authenticate, then return a sanitized version of the user
 * @param body
 */
export async function userLogin(body: FOMReq): Promise<FOMRes> {
  return {
    item: sanitize(await save((await authGetDocuments(body)).user.item)),
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
  let user = (await authGetDocuments(body)).user.item

  // These are the only things that can be updated on a user. More dynamic methods exist, but that requires cleaning
  // the incoming message (more expensive).
  user.name = body.content?.name ? body.content.name : user.name
  user.password = body.content?.password ? body.content.password : user.password
  user.onLeave = body.content?.onLeave ? body.content.onLeave : user.onLeave

  return {
    item: sanitize(await save(user, !!body.content?.password)),
    msg: `Successfully updated user ${user.name}`
  }
}

/**
 * DELETE: Remove the user from the DB.
 * @param body
 */
export async function userDelete(body: FOMReq): Promise<FOMRes> {
  const user = await authGetDocuments(body)

  // Unlink from other lists and groups

  throw new Error('here')
}