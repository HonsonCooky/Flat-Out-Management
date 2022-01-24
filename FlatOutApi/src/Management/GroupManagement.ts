import {safeUpdate, sanitize, save} from "./_Utils";
import {GroupModel} from "../Schemas/GroupSchema";
import {authGetDocuments} from "./_Authentication";
import {FOMReq, FOMRes, RoleEnum} from "../_Interfaces";


/** ----------------------------------------------------------------------------------------------------------------
 * LOCAL HELPER FUNCTIONS
 ------------------------------------------------------------------------------------------------------------------- */

/**
 * GET GROUP ADMINS: Returns a list of User Id's that have the 'admin' role associated with them.
 * @param group: The group to find admins for.
 */
function getGroupAdmins(group: any): string[] {
  if (!group) throw new Error('500: Unable to run "getGroupAdmins" without a group document')
  return group.users.filter((uar: any) => uar.role === 'admin').map((uar: any) => uar.user)
}

/**
 * FILTER USER FROM GROUP: Remove all instances of the user from the group.
 * @param group
 * @param user
 */
function filterUserFromGroup(group: any, user: any) {
  // Remove user from group users and join requests
  group.users = group.users.filter((uar: any) => user._id.equals(uar.user))
  group.joinRequests = group.joinRequests.filter((uar: any) => user._id.equals(uar.user))

  // Remove group from user and join requests
  user.groups = user.groups.filter((gid: any) => group._id.equals(gid))
  user.joinRequests = user.joinRequests.filter((gid: any) => group._id.equals(gid))
}

/**
 *
 * @param group
 * @param user
 * @param role
 */
function addUserToGroup(group: any, user: any, role: RoleEnum) {

}

/**
 * CONNECT USER: Save the user to the group. If the user is being linked to the group, they are being added as a
 * user. Else they are sending a join request.
 * @param group
 * @param user
 * @param role
 * @param link: Should the user be linked to this group? If not, then this is a join request.
 */
async function connectUser(group: any, user: any, role: RoleEnum, link: boolean = false) {

  await save(group, false)
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
    item: sanitize(await save(new GroupModel(safeUpdate(body)), true)),
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
  return {
    item: sanitize((await authGetDocuments(body)).group.item),
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
  // Set up the joining
  let auth = (await authGetDocuments(body))
  let user = auth.user.item, group = auth.group.item
  let role = body.content?.role ? body.content.role : RoleEnum.ASSOCIATE
  return {
    item: sanitize(group),
    msg: `Successfully joined group ${group.name}`
  }
}