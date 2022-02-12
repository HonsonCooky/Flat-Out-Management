import {IRes, JwtAuthContract} from "../interfaces/_fomObjects";
import {ModelEnum} from "../interfaces/_enums";
import {_middleAuthWithBody, _middleAuthWithJWT} from "./_genericManagementMiddleFunctions";
import _logger from "../config/_logger";
import {Types} from "mongoose";
import {signJWT} from "./_authentication";
import {IUser} from "../schemas/UserSchema";


/**
 * USER LOGIN: Login a user. This is the only instance of directly logging into the service. All other forms of
 * authentication come from 'connect'.
 * @see _middleAuthWithBody
 */
export async function userLogin(auth: JwtAuthContract | any): Promise<IRes> {
  _logger.info(`Attempting user login`)

  let user: IUser
  if (!auth.uuid && auth.docName && auth.password) {
    user = await _middleAuthWithBody(auth, ModelEnum.USER) as IUser
    user.uuid = new Types.ObjectId()
    await user.save()
  }
  // Authenticate with JWT
  else {
    user = await _middleAuthWithJWT(auth)
  }

  let token = signJWT(user, auth.expiresIn)

  _logger.info(`Successfully logged in user: "${user.docName}"`)
  return {
    msg: `Successfully logged in user: "${user.docName}"`,
    item: user,
    token: 'Bearer ' + token
  }
}
