import {Authenticator, Group, GroupModel, Item, SanitizedGroup, User, UserModel} from "../Util/Schemas";
import {compareHashes} from "../Util/UtilFunctions";
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
 * The user schema has some inbuilt middleware validations. This function ensures that whatever JSON object is
 * parsed in, conforms to the necessary structure of the UserSchema.
 * @param group: Group
 */
async function validateGroup(group: Group) {
    let errMsg = new GroupModel(group).validateSync()
    if (errMsg != null) throw new Error("400:" + errMsg.message.replace(/,/g, "\n").replace(/:/, ''))
}

/** ----------------------------------------------------------------------------------------------------------------
 * API FUNCTIONS
 ------------------------------------------------------------------------------------------------------------------- */


// export function groupCreate(group: Group): Promise<SanitizedGroup>{
//     if (!group.users || group.users.length === 0) throw new Error(`400:No users assigned to group`)
//
// }