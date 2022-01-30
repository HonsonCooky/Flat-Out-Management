import {Model, Schema} from "mongoose";
import {UserModel} from "../Schemas/UserSchema";
import {GroupModel} from "../Schemas/GroupSchema";
import bcrypt from "bcryptjs";
import {Authentication, AuthRes, FOMReq, FOMRes} from "../Interfaces/UtilInterfaces";


/** -----------------------------------------------------------------------------------------------------------------
 * CRYPTO:
 * Crypto functions to provide some UUID, hashing and salting, also validation of hashes.
 ----------------------------------------------------------------------------------------------------------------- */
export function saltAndHash(input: string): string {
  if (!input) throw new Error("400: Invalid salt and hash input")
  return bcrypt.hashSync(input, bcrypt.genSaltSync())
}

export function compareHashes(nonHash: string, hash: string): boolean {
  if (!nonHash || !hash) return false
  return bcrypt.compareSync(nonHash, hash)
}

/** -----------------------------------------------------------------------------------------------------------------
 * VALIDATION:
 * Authentication functions to ensure that actions taken are done in the structured order intended by the API.
 ----------------------------------------------------------------------------------------------------------------- */

/**
 * AUTHENTICATE USER: Find the user document, and validate the secret against either a password or session token.
 * @param userAuth
 */
async function authenticateUser(userAuth: Authentication): Promise<FOMRes> {
  if (!userAuth) return {msg: '400: This action requires an authenticated user to complete'}

  // Get the user
  let user: any = await UserModel.findOne({_id: userAuth.identifier})
  if (!user) return {msg: `400: Unable to find user with identifier ${userAuth.identifier}`}

  // Validate the user
  let valid = userAuth.secret === user.sessionToken || compareHashes(userAuth.secret, user.password)
  if (!valid) return {msg: `400: Incorrect validation secret`}


  return {
    item: user,
    msg: `User found and authenticated`
  }
}

/**
 * AUTHENTICATE GROUP: Find the group document, and validate it by either an existing user id (already joined user), or
 * valid secret.
 * @param groupAuth
 * @param validatedUserId: A user id from a document which has ALREADY been validated.
 */
async function authenticateGroup(groupAuth: Authentication, validatedUserId: Schema.Types.ObjectId): Promise<FOMRes> {
  if (!groupAuth) return {msg: '400: This action requires an authenticated user to complete'}

  // Get the user
  let group: any = await GroupModel.findOne({_id: groupAuth.identifier})
  if (!group) return {msg: `400: Unable to find group with identifier ${groupAuth.identifier}`}

  // Validate the group
  let validPassword = (groupAuth.secret && compareHashes(groupAuth.secret, group.password))
  let validUser = group.users.some((uar: any) => uar.user.equals(validatedUserId))
  if (!validPassword && !validUser) return {msg: `400: Incorrect validation secret`}

  return {
    item: group,
    msg: `Group found. Authentication via: Valid Password '${validPassword}, Valid User '${validUser}'`
  }
}

/**
 * AUTHENTICATE OTHER: All other items are authenticated by either the user or the group they are associated with.
 * When a user and group have been authenticated, it's merely a matter of finding out what the association is.
 */
async function authenticateOther(content: any, user: any, group: any, contentModel?: Model<any>): Promise<FOMRes> {
  if (!contentModel || !content) return {msg: `Unable to find document without a model and identifier`}

  // First, get the object
  let document: any = await contentModel.findOne({_id: content.identifier})
  if (!document) return {msg: `Unable to find document ${content.identifier} in ${contentModel.name}`}

  if (group && document.associations.some((id: any) => id.equals(group._id))) return {item: document, msg: `Item found and authenticated by group association: '${group.name}'`}
  if (user && document.associations.some((id: any) => id.equals(user._id))) return {item: document, msg: `Item found and authenticated by user association: '${user.name}'`}

  return {
    msg: `400: Unable to authenticate access to item ${content.identifier}`
  }
}

/**
 * AUTH GET DOCUMENTS: This generic method attempt to retrieve the User, Group and List documents from the MongoDB
 * instance. It does NOT throw errors, as there are instances where an object is not needed, but checked for
 * regardless. When the incoming request only contains what it needs two, the method can be fast, however, if the
 * incoming message requests for a group document, when it only needs a user, then the requester is at fault for
 * this slow calculation and validation.
 *
 * Users are the single source of validity in this program. This is because the user document is the only REQUIRED
 * document. You don't NEED Groups or Lists.
 * @param body
 * @param model
 */
export async function authGetDocuments(body: FOMReq, model?: Model<any>): Promise<AuthRes> {
  // Authenticate the user (as that is always required)
  let user = await authenticateUser(body.userAuth)
  if (!user.item) throw new Error(user.msg)

  let group = await authenticateGroup(body.groupAuth, user.item._id)
  if (body.groupAuth && !group.item) throw new Error(group.msg)

  let other = await authenticateOther(body.content, user.item, group.item, model)
  if (model && !other.item) throw new Error(other.msg)

  return {user, group, other}
}