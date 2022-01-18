import {UserModel} from "../Schemas/UserSchema";
import {FOMReq, FOMRes} from "./_ManagementTypes";
import {authenticate} from "./_Authentication";
import {sanitize, save} from "./_Utils";
import {checkIds} from "../Util/idChecker";
import {GroupModel} from "../Schemas/GroupSchema";
import {ListModel} from "../Schemas/ListSchema";

export async function checkUserIds(user: any) {
  if (user.groups) await checkIds(GroupModel, ...user.groups)
  if (user.lists) await checkIds(ListModel, ...user.lists)
}

/**
 * CREATE: Create a User document
 * @param body
 */
export async function userCreate(body: FOMReq): Promise<FOMRes> {
  return {
    item: sanitize(await save(new UserModel(body.content), true)),
    msg: `Successfully created user`
  }
}

/**
 * LOGIN: Authenticate, then return a sanitized version of the user
 * @param body
 */
export async function userLogin(body: FOMReq): Promise<FOMRes> {
  return {
    item: sanitize(await save(await authenticate(body.userAuth, UserModel), false)),
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
  const user = await authenticate(body.userAuth, UserModel)

  if (!body.content) throw new Error(`400: No content for user update`)

  // Can't update _id, sessionToken or groups
  const {_id, sessionToken, groups, ...rest} = body.content

  Object.keys(rest).forEach(key => user[key] = rest[key])

  return {
    item: sanitize(await save(user, !!body.content.password)),
    msg: `Successfully updated user ${user._id}`
  }
}