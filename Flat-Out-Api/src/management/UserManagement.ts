import {IRes, JWTPayload} from "../interfaces/_fomObjects";
import {
  _autoLoginProtectedDocument,
  _deleteDocument,
  _loginProtectedDocument,
  _registerProtectedDocument
} from "./_genericManagementFullFunctions";
import {ModelEnum} from "../interfaces/_enums";
import {_middleProtectedUpdate} from "./_genericManagementHalfFunctions";
import {IUser} from "../schemas/UserSchema";
import _logger from "../config/_logger";

/** -------------------------------------------------------------------------------------------------------------------
 * GENERIC
 -------------------------------------------------------------------------------------------------------------------*/
// REGISTER
export async function userRegister(body: any): Promise<IRes> {
  return _registerProtectedDocument(body, ModelEnum.Users)
}
// LOGIN
export async function userLogin(body: any): Promise<IRes> {
  return _loginProtectedDocument(body, ModelEnum.Users)
}
// AUTO LOGIN
export async function userAutoLogin(jwt: JWTPayload): Promise<IRes> {
  return _autoLoginProtectedDocument(jwt, ModelEnum.Users)
}
// DELETE
export async function userDelete(jwt: JWTPayload): Promise<IRes> {
  return _deleteDocument(jwt, ModelEnum.Users)
}

/** -------------------------------------------------------------------------------------------------------------------
 * UNIQUE
 -------------------------------------------------------------------------------------------------------------------*/

/**
 * USER UPDATE: Update the user
 * @param jwt
 * @param body {
 *   docName
 * }
 */
export async function userUpdate(jwt: JWTPayload, body: any): Promise<IRes> {
  let user: IUser = await _middleProtectedUpdate(jwt, body, ModelEnum.Users) as IUser
  if (!('outOfFlatDates' in user)) throw new Error(`400: Document id does not refer to a User document`)

  user.outOfFlatDates = body.outOfFlatDates ? body.outOfFlatDates : user.outOfFlatDates

  await user.save()

  _logger.info(`Successfully updated user ${user._id}`)

  return {
    msg: `Successfully updated user ${user.docName}`,
    item: user
  }
}
