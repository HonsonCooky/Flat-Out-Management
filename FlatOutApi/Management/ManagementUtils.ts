import {Tag} from "../Util/Constants";
import {UserModel} from "../Schemas/UserSchema";
import {GroupModel} from "../Schemas/GroupSchema";
import {ListModel} from "../Schemas/ListSchema";
import {ItemModel} from "../Schemas/ItemSchema";
import {generateIdWithTag} from "../Util/Crypto";
import {SessionModel} from "../Schemas/SessionTokenSchema";

/**
 * Ensure consistent error messages
 */
function invalidTokenMsg(token: string, association: string) {
  return `400: ${association} '${token}' doesn't exist`
}

/**
 * Check that some id being used is to link objects, is a valid, pre-existing object.
 * @param tokens
 */
export async function checkTokens(tokens: string[]) {
  // Remove non-truthy values
  const filtered = tokens.filter(Boolean)

  // For all tokens provided, check their existence
  for (let i = 0; i < filtered.length; i++) {

    // Extract the token
    const token = tokens[i]

    // Use the identifying character to attempt to find an existing token
    switch (token[0]) {
      case Tag.User:
        if (await UserModel.countDocuments({id: token}) > 0) break;
        throw new Error(invalidTokenMsg(token, 'User'))
      case Tag.Group:
        if (await GroupModel.countDocuments({id: token}) > 0) break;
        throw new Error(invalidTokenMsg(token, 'Group'))
      case Tag.List:
        if (await ListModel.countDocuments({id: token}) > 0) break;
        throw new Error(invalidTokenMsg(token, 'List'))
      case Tag.Item:
        if (await ItemModel.countDocuments({id: token}) > 0) break;
        throw new Error(invalidTokenMsg(token, 'Item'))
      default:
        throw new Error(`Provided an unknown token ${token}`)
    }
  }
}

/**
 * Generate a new session.
 */
export async function createSession(): Promise<string> {
  let sessionToken = generateIdWithTag(Tag.Session)
  let expiration = new Date()
  expiration.setMonth(expiration.getMonth() + 1)
  await new SessionModel({token: sessionToken, expiresAt: expiration}).save()
  return sessionToken
}

/**
 * Remove "password" field from some object. This is needed when returning values back to the user. Although parsing
 * the password back to the user would not be too detrimental (salt+hash); BUT passing this to the user is an
 * unnecessary risk.
 * @param obj
 */
export function sanitizeObj(obj: any) {
  const newObj = {...obj._doc}
  delete newObj.password
  return newObj
}

