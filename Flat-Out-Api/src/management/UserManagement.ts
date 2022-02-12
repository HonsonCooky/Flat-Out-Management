import {BodyAuthContract, IRes, JwtAuthContract} from "../interfaces/_fomObjects";
import {ModelEnum} from "../interfaces/_enums";
import {_middleAuthWithBody, _middleAuthWithJWT} from "./_genericManagementMiddleFunctions";
import _logger from "../config/_logger";
import {Types} from "mongoose";
import {saltAndHash, signJWT} from "./_authentication";
import {IUser} from "../schemas/UserSchema";


/**
 * USER LOGIN: Login a user. This is the only instance of directly logging into the service. All other forms of
 * authentication come from 'connect'.
 * @see _middleAuthWithBody
 */
export async function userLogin(auth: JwtAuthContract | BodyAuthContract): Promise<IRes> {
  _logger.info(`Attempting user login`)

  let user: IUser
  if (!auth.uuid) {
    user = await _middleAuthWithBody(auth as BodyAuthContract, ModelEnum.USER) as IUser
    user.uuid = new Types.ObjectId()
    await user.save()
  }
  // Authenticate with JWT
  else {
    user = await _middleAuthWithJWT(auth as JwtAuthContract)
  }

  let token = signJWT(user, auth.expiresIn)

  _logger.info(`Successfully logged in user: "${user.docName}"`)
  return {
    msg: `Successfully logged in user: "${user.docName}"`,
    item: user,
    token: 'Bearer ' + token
  }
}

/**
 * USER UPDATE: Update some user values.
 * @param jwt: JwtAuthContract
 * @param body {
 *
 * }
 * @see JwtAuthContract
 */
export async function userUpdate(jwt: JwtAuthContract, body: any): Promise<IRes> {
  let user: IUser = await _middleAuthWithJWT(jwt)

  user.docName = body.docName ?? user.docName
  user.uiName = body.uiName ?? user.uiName
  user.password = body.password ? saltAndHash(body.password) : user.password
  user.outOfFlatDates = body.outOfFlatDates ?? user.outOfFlatDates

  await user.save()

  return {
    msg: `Successfully updated user: ${user.docName}`,
    item: user
  }
}
