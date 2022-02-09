import {IRes} from "../interfaces/_fomObjects";
import {ModelEnum} from "../interfaces/_enums";
import {_middleProtectedUpdate} from "./_genericManagementHalfFunctions";
import {IUser} from "../schemas/UserSchema";
import _logger from "../config/_logger";
import {IDocModelAndRole} from "../interfaces/_docRoleAndModel";
import {getDocFromBody} from "./_genericHelperFunctions";
import {Types} from "mongoose";
import {signJWT} from "./_authentication";

/**
 * LOGIN PROTECTED DOCUMENT: If a document is protected. Then registering won't
 * @param body {
 *   docName: string,
 *   password: string
 * }
 */
export async function userLogin(body: any): Promise<IRes> {
  _logger.info(`Attempting user login: Credentials`)

  let doc = await getDocFromBody(body, ModelEnum.USER)
  doc.uuid = new Types.ObjectId()
  await doc.save()

  let token = signJWT(doc, ModelEnum.USER)

  _logger.info(`Successfully logged in user: "${doc._id}"`)

  return {
    msg: `Successfully logged in user: "${doc.uiName}"`,
    item: doc,
    token: 'Bearer ' + token
  }
}


/**
 * USER UPDATE: Update the user
 * @param jwt: JWT Authentication Token of user document
 * @param body {
 *  ..._middleProtectedUpdate,
 *  outOfFlatDates?: Date[]
 * }
 */
export async function userUpdate(jwt: IDocModelAndRole, body: any): Promise<IRes> {
  let user: IUser = await _middleProtectedUpdate(jwt, body, ModelEnum.USER) as IUser
  if (!('outOfFlatDates' in user)) throw new Error(`400: Document id does not refer to a User document`)
  user.outOfFlatDates = body.outOfFlatDates ? body.outOfFlatDates : user.outOfFlatDates

  await user.save()
  _logger.info(`Successfully updated user "${user._id}"`)
  return {
    msg: `Successfully updated user "${user.docName}"`,
    item: user
  }
}
