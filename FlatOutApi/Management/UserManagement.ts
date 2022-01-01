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

async function getUser(findFilter: any): Promise<any> {
  let user: any = await UserModel.findOne(findFilter)
  if (!user) throw new Error(`400: Cannot find user with '${findFilter}'`)
  return user
}

async function updateUserSession(user: any): Promise<any> {
  user.sessionToken = saltAndHash(user.id + secret)
  await user.save()
  return sanitizeUser(user)
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
  return updateUserSession(user)
}

/**
 * CREDENTIAL LOGIN: Validate the user with a username and password.
 * @param body: {id: string, password: string, rememberMe: boolean}
 */
export async function userCredLogin(body: any): Promise<any> {
  // Find the user by id
  let user: any = await getUser({name: body.name})
  if (!compareHashes(body.password, user.password)) throw new Error('400: Incorrect Password')
  return updateUserSession(user)
}

/**
 * SESSION LOGIN: Using a session token, authenticate the user. Session tokens are provided on successful login.
 * @param body
 */
export async function userTokenLogin(body: any): Promise<any> {
  let user: any = await getUser({id: body.id})
  if (body.sessionToken != user.sessionToken) throw new Error('400: Incorrect session token')
  return updateUserSession(user)
}

/**
 * UPDATE USER: One call, to update the stored user data. Localized computation will dictate if this data is
 * correct. The validation features will catch anything that is blatantly wrong. Other features will depend on
 * client implementations.
 * @param body
 */
export async function userUpdate(body: any): Promise<any> {
  // Authenticate the user first. Ensure actions are done with the authority to do so.
  const {id, sessionToken, ...rest} = body
  let user: any = await getUser({id: body.id})
  if (body.sessionToken != user.sessionToken) throw new Error('400: Incorrect session token')

  // Check for valid components
  Object.keys(rest).forEach((key) => user[key] = rest[key])
  await checkUserTokens(user)
  return updateUserSession(user)
}


