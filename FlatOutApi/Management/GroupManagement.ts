import {FOMReq, FOMRes} from "./_ManagementTypes";
import {sanitize, save} from "./_Utils";
import {GroupModel} from "../Schemas/GroupSchema";
import {authenticate, get} from "./_Authentication";
import {UserModel} from "../Schemas/UserSchema";

function userInGroup(userId: string, group: any): boolean {
  return group.users.map((uar: any) => uar.user).includes(userId)
}

function getGroupAdmins(group: any): string[] {
  return group.users.filter((uar: any) => uar.role === 'admin').map((uar: any) => uar.user)
}

function addUserAndRole(list: any[], uar: any): any[]{
  let l = list.filter(x => x.user != uar.user)
  l.push(uar)
  return l
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
  const user = await authenticate(body.userAuth, UserModel)

  if (!body.groupAuth) throw new Error('400: No group id provided for login')
  const group = await get(body.groupAuth.identifier, GroupModel)

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

  if (!body.content.role) throw new Error('400: Missing user role from group join request')
  if (body.content.role === 'admin' && getGroupAdmins(group).length > 0) return groupJoinRequest(body)

  group.users = addUserAndRole(group.users, {user: user._id, role: body.content.role})
  return {
    item: sanitize(await save(group, false)),
    msg: `Successfully joined group ${group.name}`
  }
}

/**
 * JOIN REQUEST: When a user doesn't have the password for a group, they can also send a request to join the group.
 * @param body: {auth: Group Auth, msg: user auth}
 */
export async function groupJoinRequest(body: FOMReq): Promise<FOMRes> {
  if (!body.userAuth) throw new Error('400: Missing group identifier')
  let group: any = await get(body.groupAuth.identifier, GroupModel)
  let user: any = await authenticate(body.userAuth, UserModel)

  if (!body.content.role) throw new Error('400: Missing user role from group join request, request')
  group.joinRequests =  addUserAndRole(group.joinRequests, {user: user._id, role: body.content.role})
  await save(group, false)
  return {
    msg: `Request to join group ${group.name} sent`
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