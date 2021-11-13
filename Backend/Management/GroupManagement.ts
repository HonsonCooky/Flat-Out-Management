import {
    Authenticator,
    Group,
    GroupModel,
    SanitizedGroup,
    UpdateGroup
} from "../Util/Schemas";
import {compareHashes, saltAndHash} from "../Util/UtilFunctions";

/** ----------------------------------------------------------------------------------------------------------------
 * UTIL FUNCTIONS
 ------------------------------------------------------------------------------------------------------------------- */
function sanitizeGroup(group: Group): SanitizedGroup {
    return {
        groupName: group.groupName,
        users: group.users,
        lists: group.lists,
        chores: group.chores
    }
}

async function authAndGetGroup(auth: Authenticator): Promise<Group> {
    // Check if group exists
    let group: Group = await GroupModel.findOne({groupName: auth.identifier.toLowerCase()})
    if (!group) throw new Error(`400: Cannot find group ${auth.identifier}`)

    // Authenticate the password
    if (!auth.password || !compareHashes(auth.password, group.password))
        throw new Error(`400:Incorrect password, but we do know that group ${group.groupName} exists`)

    return group
}

async function validateGroup(group: Group) {
    let errMsg = new GroupModel(group).validateSync()
    if (errMsg) throw new Error("400:" + errMsg.message.replace(/,/g, "\n").replace(/:/, ''))
}

/** ----------------------------------------------------------------------------------------------------------------
 * API FUNCTIONS
 ------------------------------------------------------------------------------------------------------------------- */

/**
 * CREATE: Create a Group document
 * @param body: Group
 */
export async function groupCreate(body: Group): Promise<SanitizedGroup> {
    if (!body.lists) body.lists = []
    if (!body.chores) body.chores = []
    await validateGroup(body)
    body.password = saltAndHash(body.password)
    await new GroupModel(body).save()
    return sanitizeGroup(body)
}

/**
 * LOGIN: Return the Group object if successful authentication
 * @param body: AuthenticationUser
 */
export async function groupLogin(body: Authenticator): Promise<SanitizedGroup> {
    let group: Group = await authAndGetGroup(body)
    await validateGroup(group)
    return sanitizeGroup(group)
}

/**
 * UPDATE: Update some Group, authenticating the action first.
 * @param body: UpdateGroup
 */
export async function groupUpdate(body: UpdateGroup): Promise<SanitizedGroup> {
    const {auth, update} = body
    let oldGroup: Group = await authAndGetGroup(auth)
    let newGroup: Group = await GroupModel.findOneAndUpdate({groupName: oldGroup.groupName},
        Object.assign(oldGroup, update), {new: true, upsert: false})
    await validateGroup(newGroup)
    return sanitizeGroup(newGroup)
}

/**
 * REMOVE: Remove a Group, authenticating the action first
 * @param body: Authenticator
 */
export async function groupRemove(body: Authenticator): Promise<SanitizedGroup> {
    let group: Group = await authAndGetGroup(body)
    await GroupModel.deleteOne(group)
    return sanitizeGroup(group)
}


/**
 * GET: Get the details of a Group
 * @param params: {i: string, p: string}
 */
export async function groupGet(params: any): Promise<SanitizedGroup> {
    const {i, p} = params
    return sanitizeGroup(await authAndGetGroup({identifier: i, password: p}))
}