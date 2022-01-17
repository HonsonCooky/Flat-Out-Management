import {FOMReq, FOMRes} from "./_ManagementTypes";
import {sanitize, save} from "./_Utils";
import {GroupModel} from "../Schemas/GroupSchema";
import {authenticate, get} from "./_Authentication";
import {UserModel} from "../Schemas/UserSchema";

function userInGroup(userId: string, group: any): { user: any, role: string } {
  return group.users.find((uar: any) => uar.user.toString() == userId)
}

function getGroupAdmins(group: any): string[] {
  return group.users.filter((uar: any) => uar.role === 'admin').map((uar: any) => uar.user)
}

function addUserAndRole(list: any[], uar: { user: any, role: string }): any[] {
  if (!uar) throw new Error(`400: Missing User and Role`)
  let l = list.filter(x => x.user.toString() != uar.user.toString())
  l.push(uar)
  return l
}

function userCheck(body: FOMReq){
  if(!body.content || !body.content.user) throw new Error('400: Missing user from request')
}

function roleCheck(body: FOMReq){
  if(!body.content || !body.content.role) throw new Error('400: Missing user role from request')
}

async function getGroupAuthUser(body: FOMReq): Promise<{ group: any, user: any }> {
  if (!body.groupAuth) throw new Error('400: No group id provided for login')
  const group = await get(body.groupAuth.identifier, GroupModel)
  const user = await authenticate(body.userAuth, UserModel)
  return {group, user}
}

async function saveUserToGroup(group: any, user: any, body: FOMReq) {
  group.users = addUserAndRole(group.users, {user: user._id, role: body.content.role})
  // Revoke all join requests that came before
  group.joinRequests = group.joinRequests.filter((x: any) => x.user.toString() != user._id.toString())
  // Update the user as well
  user.groups.push(group._id)
  await save(group, false);
  await save(user, false);
}

/** ----------------------------------------------------------------------------------------------------------------
 * API FUNCTIONS
 ------------------------------------------------------------------------------------------------------------------- */
/**
 * CREATE: Create a new Group document.
 * @param body
 */
export async function groupCreate(body: FOMReq): Promise<FOMRes> {
  return {
    item: sanitize(await save(new GroupModel(body.content), true)),
    msg: `Successfully created group`
  }
}

/**
 * LOGIN: A group login only requires user authentication, and a check that the user is in the group. If the user is
 * in the group, they have authenticated themselves previous, and don't require to do it again. This removes
 * duplicating authentication standards in place for the user.
 * @param body
 */
export async function groupLogin(body: FOMReq): Promise<FOMRes> {
  const {group, user} = await getGroupAuthUser(body)
  console.log(userInGroup(user._id, group))
  if (!userInGroup(user._id, group)) throw new Error('400: Unauthorized group login request')
  return {
    item: sanitize(group),
    msg: `Successful group login`
  }
}

/**
 * JOIN: In order for the user to join a group, they must be able to authenticate themselves, and authenticate the
 * group. These two credentials means we can ensure that said user has made an attempt to join said group. It also
 * means that from this point onwards, the user simply has to identify themselves in order to access the group
 * information.
 * @param body
 */
export async function groupJoin(body: FOMReq): Promise<FOMRes> {
  let user: any = await authenticate(body.userAuth, UserModel)
  let group: any = await authenticate(body.groupAuth, GroupModel)
  roleCheck(body)

  // Admins must allow other admins
  if (body.content.role === 'admin' && getGroupAdmins(group).length > 0) return groupJoinRequest(body)

  // Each group must have at least one admin
  if (getGroupAdmins(group).length === 0) body.content.role = 'admin'

  // Save group to user, and user to group
  await saveUserToGroup(group, user, body)

  return {
    msg: `Successfully joined group ${group.name}`
  }
}

/**
 * JOIN REQUEST: When a user doesn't have the password for a group, they can also send a request to join the group.
 * @param body: {auth: Group Auth, msg: user auth}
 */
export async function groupJoinRequest(body: FOMReq): Promise<FOMRes> {
  const {group, user} = await getGroupAuthUser(body)
  if (getGroupAdmins(group).includes(user._id)) return {msg: `User ${user._id} is already an admin`}
  roleCheck(body)

  // Add the user to join requests of the group
  group.joinRequests = addUserAndRole(group.joinRequests, {user: user._id, role: body.content.role})
  await save(group, false)
  return {
    msg: `Request to join group ${group.name} sent`
  }
}

/**
 * JOIN ACCEPT: To accept a join request, a user must be an ADMIN and be able to login to the group.
 * @param body
 */
export async function groupJoinAccept(body: FOMReq): Promise<FOMRes> {
  const {group, user} = await getGroupAuthUser(body)
  const uar = userInGroup(user._id, group)
  if (!uar || uar.role != 'admin')
    throw new Error(`400: User ${user._id} does not have authorization to accept user requests`)

  userCheck(body)
  let userToAdd = group.joinRequests.find((uar: any) => body.content.user.toString() === uar.user.toString())
  if (!userToAdd) throw new Error(`400: Unable to find join request for ${body.content.user}`)

  await saveUserToGroup(group, await UserModel.findOne({_id: userToAdd.user}), body)

  return {
    msg: `User join request granted`
  }
}

/**
 * NAMES: Get all the group names. Group names are publicly known to show users what groups already exist.
 */
export async function groupNames(): Promise<FOMRes> {
  const groups = await GroupModel.find({})
  return {
    item: groups.map((group: any) => group.name),
    msg: `Group names returned`
  }
}