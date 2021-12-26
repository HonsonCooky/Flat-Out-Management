import {UserModel} from "../Schemas/UserSchema";
import {compareHashes, generateIdWithTag, saltAndHash} from "../Util/Crypto";
import {checkIds} from "./ManagementUtils";
import {Tag} from "../Util/Constants";
import {secret} from "../index";

async function checkUserTokens(user: any) {
  await checkIds([user.group, ...user.groupsByAssociation, ...user.lists])
}

function sanitizeUser(user: any) {
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
export async function userCreate(body: any): Promise<string> {
  // Setup user object
  let user: any = new UserModel(body)
  user.id = generateIdWithTag(Tag.User)
  user.password = saltAndHash(user.password)
  user.sessionToken = saltAndHash(user.id + secret)

  // Check each token provided by the user is a valid token
  await checkUserTokens(user)
  await user.save()
  return user.id
}

/**
 * CREDENTIAL LOGIN: Validate the user with a username and password.
 * @param body: {id: string, password: string, rememberMe: boolean}
 */
export async function userCredLogin(body: any): Promise<any> {
  // Find the user by id
  let user: any = await UserModel.findOne({name: body.name})
  if (!user) throw new Error(`400: Cannot find user '${body.name}'`)
  if (!compareHashes(body.password, user.password)) throw new Error('400: Incorrect Password')

  // User validated
  user.sessionToken = saltAndHash(user.id + secret)
  await user.updateOne()
  return sanitizeUser(user)
}

export async function userSessionLogin(body: any): Promise<any> {

}
