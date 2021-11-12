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
/**
 * A simple conversion from a MongoDB group, to a SanitizedGroup. This enables the internal calls to access all the
 * information of the group, but the sanitized group is the JSON object that is parsed to the client. Removing
 * information that is not-relevant, or needs to be kept secret.
 * @param group: Group
 */
function sanitizeGroup(group: Group): SanitizedGroup {
    return {
        groupName: group.groupName,
        users: group.users,
        lists: group.lists,
        chores: group.chores
    }
}

/**
 * Get the Group from the MongoDB collection, and check that a given password is the same as the stored password. The
 * method will throw errors in cases where something is wrong.
 * @param auth: Authenticator
 */
async function authAndGetGroup(auth: Authenticator): Promise<Group> {
    let group: Group = await GroupModel.findOne({groupName: auth.identifier.toLowerCase()})
    if (!group) throw new Error(`400: Cannot find group ${auth.identifier}`)

    if (!auth.password || !compareHashes(auth.password, group.password))
        throw new Error(`400:Incorrect password, but we do know that group ${group.groupName} exists`)

    return group
}

/**
 * The group schema has some inbuilt middleware validations. This function ensures that whatever JSON object is
 * parsed in, conforms to the necessary structure of the UserSchema.
 * @param group: Group
 */
async function validateGroup(group: Group) {
    let errMsg = new GroupModel(group).validateSync()
    if (errMsg) throw new Error("400:" + errMsg.message.replace(/,/g, "\n").replace(/:/, ''))
}

/** ----------------------------------------------------------------------------------------------------------------
 * API FUNCTIONS
 ------------------------------------------------------------------------------------------------------------------- */

/**
 * CREATE: Given a JSON body, the create acts as an interface to fill, validate, and enter a GROUP document into the
 * 'groups' MongoDB collection. Note, errors are thrown to indicate the presence of some issue.
 * @param group: Group
 */
export async function groupCreate(group: Group): Promise<SanitizedGroup> {
    if (!group.lists) group.lists = []
    if (!group.chores) group.chores = []
    await validateGroup(group)
    group.password = saltAndHash(group.password)
    await new GroupModel(group).save()
    return sanitizeGroup(group)
}

/**
 * LOGIN: Given a JSON body, the login acts as an interface to authenticate an attempted login by some group member.
 * Firstly, it validates the existence, and correctness of the group through a groupName and password. Then it
 * validates that the group stored is a valid group. Finally, it sanitized the JSON object such that only relevant
 * information is given back to the group member.
 * @param body: AuthenticationUser
 */
export async function groupLogin(body: Authenticator): Promise<SanitizedGroup> {
    let group: Group = await authAndGetGroup(body)
    await validateGroup(group)
    return sanitizeGroup(group)
}

/**
 * UPDATE: Given a JSON body, the update function acts as an interface to authenticate then update, a pre-existing
 * group in the MongoDB 'groups' collection.
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
 * REMOVE: The remove function is slightly different, but will follow the same footprint as before. Removing the group
 * from the MongoDB 'groups' collection will simply delete the group document. Like most actions, this requires a
 * password such that no one can do this on accident, or without intentional bad design.
 * @param body: Authenticator
 */
export async function groupRemove(body: Authenticator): Promise<SanitizedGroup> {
    let group: Group = await authAndGetGroup(body)
    await GroupModel.deleteOne(group)
    return sanitizeGroup(group)
}


/**
 * GET: A faster 'get.time < post.time' means of retrieving the information for a group.
 * No validation here, simply get and wait.
 * @param params: {i: string, p: string}
 */
export async function groupGet(params: any): Promise<SanitizedGroup> {
    const {i, p} = params
    return sanitizeGroup(await authAndGetGroup({identifier: i, password: p}))
}