import {
    Authenticator,
    Group,
    GroupModel,
    SanitizedGroup,
    UpdateGroup, User
} from "../Util/Schemas";
import {compareHashes, saltAndHash} from "../Util/UtilFunctions";

/** ----------------------------------------------------------------------------------------------------------------
 * UTIL FUNCTIONS
 ------------------------------------------------------------------------------------------------------------------- */
function sanitizeGroup(group: Group): SanitizedGroup {
    return {
        groupName: group.groupName,
        chores: group.chores,
        lists: group.lists,
        users: group.users
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
    body.lists = []
    body.chores = []
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
 * AUTO LOGIN: Users who are validated with the group have instant access without password needed. Saves storing the
 * password on the client side (unsafe)
 * @param body: User
 */
export async function groupLoginAuto(body: User): Promise<SanitizedGroup>{
    let group: Group = await GroupModel.findOne({groupName: body.group.toLowerCase()})
    if (!group) throw new Error(`400: Cannot find group ${body.group}`)
    await validateGroup(group)

    // Check user is in group
    if (!group.users.includes(body.username.toLowerCase()))
        throw new Error(`400:User not registered with group '${group.groupName}'`)

    return sanitizeGroup(group)
}

/**
 * UPDATE: Update some Group, authenticating the action first.
 * @param body: UpdateGroup
 */
export async function groupUpdate(body: UpdateGroup): Promise<SanitizedGroup> {
    const {auth, update} = body
    let oldGroup: Group = await authAndGetGroup(auth)
    let oldKey: string = oldGroup.groupName

    // Apply update locally and validate
    let newGroup = Object.assign(oldGroup, update)
    await validateGroup(newGroup)

    // Passing validation, update the MongoDB instance
    await GroupModel.findOneAndUpdate({groupName: oldKey}, newGroup, {new: true, upsert: false})
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