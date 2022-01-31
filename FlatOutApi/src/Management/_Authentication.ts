import {Model, Types} from "mongoose";
import {UserModel} from "../Schemas/UserSchema";
import {GroupModel} from "../Schemas/GroupSchema";
import bcrypt from "bcryptjs";
import {Authentication, FOMReq, Other, RequestExtractions, RoleEnum} from "../Interfaces/UtilInterfaces";
import {User} from "../Interfaces/UserInterface";
import {Group} from "../Interfaces/GroupInterface";


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
 * AUTHENTICATE USER: Find the user, and if a secret is supplied, then validate the secret. Return the user found if
 * that is all that is required.
 * @param userAuth
 */
async function authenticateUser(userAuth: Authentication | undefined): Promise<User | undefined> {
  if (!userAuth) return undefined

  // Get the user
  let user: User | null = await UserModel.findOne({_id: userAuth.identifier})
  if (!user) throw new Error(`400: Unable to find user with identifier ${userAuth.identifier}`)

  // Validate the user
  if (userAuth.secret) {
    let valid = userAuth.secret === user.sessionToken || compareHashes(userAuth.secret, user.password)
    if (!valid) throw new Error(`400: Invalid login for user ${user.name}`)
  }

  return user
}

/**
 * AUTHENTICATE GROUP: Find the group document, and if a secret is supplied, then validate the secret OR if a
 * userAuth came before, then check to see if the user id exists in the group already.
 * @param groupAuth
 * @param userId: A user id from a document which has ALREADY been validated.
 */
async function authenticateGroup(groupAuth: Authentication | undefined,
                                 userId?: Types.ObjectId): Promise<Group | undefined> {
  if (!groupAuth) return undefined

  // Get the group
  let group: Group | null = await GroupModel.findOne({_id: groupAuth.identifier})
  if (!group) throw new Error(`400: Unable to find group with identifier ${groupAuth.identifier}`)

  // Validate the group
  if (groupAuth.secret) {
    // Valid via password
    let validPassword = (groupAuth.secret && compareHashes(groupAuth.secret, group.password))

    // Valid via pre-existence in group
    let validUser = userId && group.users.some((uar: any) =>
      uar.user.equals(userId)
      && uar.role != RoleEnum.JOIN_REQ
      && uar.role != RoleEnum.ASSOCIATE)

    if (!validPassword && !validUser) throw new Error(`400: Unable to authorize action in group ${group.name}`)
  }

  return group
}

/**
 * AUTHENTICATE OTHER: All other items are authenticated by either the user or the group they are associated with.
 * When a user and group have been authenticated, it's merely a matter of finding out what the association is.
 * Else, simply find the object and return it
 */
async function authenticateOther(content: any,
                                 userId?: Types.ObjectId,
                                 groupId?: Types.ObjectId,
                                 contentModel?: Model<Other>): Promise<Other | undefined> {
  if (!contentModel || !content) return undefined

  // First, get the object
  let document: Other | null = await contentModel.findOne({_id: content.identifier})
  if (!document) throw new Error(`400: Unable to find document ${content.identifier} in collection ${contentModel.name}`)

  if (document.associations) {
    let association = document.associations.some((id: Types.ObjectId) =>
      (userId && id.equals(userId)) ||
      (groupId && id.equals(groupId))
    )

    if (!association) throw new Error(`400: Authentication to document ${document.name} denied with user ${userId} or group ${groupId}`)
  }

  return document
}

/**
 * AUTH GET DOCUMENTS: This generic method attempts to retrieve all objects from the body of a request. Documents
 * are either linked to a user, or to a group. User authentication is done via specific
 * @param body
 * @param model
 */
export async function bodyToFomObjects(body: FOMReq, model?: Model<Other>): Promise<RequestExtractions> {
  let user = await authenticateUser(body.userAuth)
  let group = await authenticateGroup(body.groupAuth, user?._id)
  let other = await authenticateOther(body.content, user?._id, group?._id, model)
  if (!other) other = body.content
  return {user, group, other}
}
