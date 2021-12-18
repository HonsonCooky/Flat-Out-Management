import {saltAndHash} from "../Util/UtilFunctions";
import {Group, GroupModel, SanitizedGroup} from "../Schemas/GroupSchema";

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

async function validateGroup(group: Group) {
    let errMsg = new GroupModel(group).validateSync()
    if (errMsg) throw new Error("400:" + errMsg.message.replace(/,/g, "\n").replace(/:/, ''))
}

/**
 * Associate Users to Chores
 * @param group
 */
// TODO Sound logic, missing pieces
// async function updateChores(group: Group) {
//     if (!group.choresAutoFill) return
//
//     let today: Date = new Date()
//     let weekLen: number = 1000 * 60 * 60 * 24 * 7 // ms -> s -> m -> d -> w
//
//     // Determine if this calculation is necessary
//     let lastUpdate: Date = new Date(group.updatedAt)
//     let lastSunday: Date = new Date(lastUpdate.getFullYear(), lastUpdate.getMonth(), lastUpdate.getDate() - lastUpdate.getDay())
//     if (((today.getTime() - lastSunday.getTime()) / weekLen) < 1) return // Don't bother updating, it's already done
//
//     // Get week number. This is a little more complicated, but necessarily for this use case.
//     // We need to get the first SATURDAY of the year. This will represent the anchor point, allowing the first
//     // Sunday to represent the time
//     let firstJan = new Date(today.getFullYear(), 0, 1);
//
//     let firstSun = new Date(today.getFullYear(), 0, 7 - firstJan.getDay())
//     let weekNum = Math.ceil((today.getTime() - firstSun.getTime()) / weekLen)
//     weekNum = weekNum < 1 ? 52 : weekNum
//
//     const users = group.users
//     const chores = group.chores
//
//     // For every chore, link a unique user to a chore (go through until no more users or chores)
//     for (let i = 0; i < chores.length && i < users.length; i++)
//         chores[i].association = users[((weekNum % chores.length) + i) % users.length]
//
//     // If enabled, and more chores than users, start filling up the leftover chores starting with the first user again.
//     if (group.choresLoop) for (let i = users.length; i < chores.length; i++)
//         chores[i].association = users[((weekNum % chores.length) + i) % users.length]
// }

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