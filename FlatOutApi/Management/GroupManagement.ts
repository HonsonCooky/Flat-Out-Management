import {
    Authenticator,
    Group,
    GroupModel, SanitizedGroup,
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
        users: group.users,
        choresAutoFill: group.choresAutoFill || false,
        choresLoop: group.choresLoop || false,
        createdAt: group.createdAt || (new Date()).toISOString(),
        updatedAt: group.updatedAt || (new Date()).toISOString()
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

/**
 * Associate Users to Chores
 * @param group
 */
async function updateChores(group: Group) {
    if (!group.choresAutoFill) return

    let today: Date = new Date()
    let weekLen: number = 1000 * 60 * 60 * 24 * 7 // ms -> s -> m -> d -> w

    // Determine if this calculation is necessary
    let lastUpdate: Date = new Date(group.updatedAt)
    let lastSunday: Date = new Date(lastUpdate.getFullYear(), lastUpdate.getMonth(), lastUpdate.getDate() - lastUpdate.getDay())
    if (((today.getTime() - lastSunday.getTime()) / weekLen) < 1) return // Don't bother updating, it's already done

    // Get week number. This is a little more complicated, but necessarily for this use case.
    // We need to get the first SATURDAY of the year. This will represent the anchor point, allowing the first
    // Sunday to represent the time
    let firstJan = new Date(today.getFullYear(), 0, 1);

    let firstSun = new Date(today.getFullYear(), 0, 7 - firstJan.getDay())
    let weekNum = Math.ceil((today.getTime() - firstSun.getTime()) / weekLen)
    weekNum = weekNum < 1 ? 52 : weekNum

    const users = group.users
    const chores = group.chores

    // For every chore, link a unique user to a chore (go through until no more users or chores)
    for (let i = 0; i < chores.length && i < users.length; i++)
        chores[i].association = users[((weekNum % chores.length) + i) % users.length]

    // If enabled, and more chores than users, start filling up the leftover chores starting with the first user again.
    if (group.choresLoop) for (let i = users.length; i < chores.length; i++)
        chores[i].association = users[((weekNum % chores.length) + i) % users.length]
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
    body.choresAutoFill = !!body.choresAutoFill // Ignore IDE simplify, needs to be a boolean
    body.choresLoop = !!body.choresLoop // Ignore IDE simplify, needs to be a boolean
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
    await updateChores(group)
    await validateGroup(group)
    return sanitizeGroup(group)
}

/**
 * AUTO LOGIN: Users who are validated with the group have instant access without password needed. Saves storing the
 * password on the client side (unsafe)
 * @param body: User
 */
export async function groupLoginAuto(body: User): Promise<SanitizedGroup> {
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
    let newGroup: Group = Object.assign(oldGroup, update)
    if (update.chores && update.chores.length > 0) await updateChores(newGroup)
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
    let group: Group = await authAndGetGroup({identifier: i, password: p})
    await updateChores(group)
    return sanitizeGroup(group)
}

export async function groupGetAll(): Promise<string[]> {
    let groups = await GroupModel.find()
    return groups.map((g: Group) => g.groupName)
}