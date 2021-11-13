import {Authenticator, SanitizedUser, UpdateUser, User, UserModel} from "../Util/Schemas";
import {compareHashes, saltAndHash} from "../Util/UtilFunctions";

/** ----------------------------------------------------------------------------------------------------------------
 * UTIL FUNCTIONS
 ------------------------------------------------------------------------------------------------------------------- */
function sanitizeUser(user: User): SanitizedUser {
    return {
        email: user.email,
        username: user.username,
        nickname: user.nickname,
        group: user.group,
        lists: user.lists || []
    }
}

async function authAndGetUser(auth: Authenticator): Promise<User> {
    // Check if user exists
    let user: User = await UserModel.findOne({
        $or: [{email: auth.identifier.toLowerCase()}, {username: auth.identifier.toLowerCase()}]
    })
    if (!user) throw new Error(`400:Cannot find user ${auth.identifier}`)

    // Authenticate the password
    if (!auth.password || !compareHashes(auth.password, user.password))
        throw new Error(`400:Incorrect password, but we do know that user ${user.username} exists`)
    return user
}

async function validateUser(user: User) {
    let errMsg = new UserModel(user).validateSync()
    if (errMsg) throw new Error("400:" + errMsg.message.replace(/,/g, "\n").replace(/:/, ''))
}

/** ----------------------------------------------------------------------------------------------------------------
 * API FUNCTIONS
 ------------------------------------------------------------------------------------------------------------------- */

/**
 * CREATE: Create a User document
 * @param body: User
 */
export async function userCreate(body: User): Promise<SanitizedUser> {
    if (!body.nickname) body.nickname = body.username
    if (!body.lists) body.lists = []
    await validateUser(body)
    body.password = saltAndHash(body.password)
    await new UserModel(body).save()
    return sanitizeUser(body)
}

/**
 * LOGIN: Return the User object if successful authentication
 * @param body: Authenticator
 */
export async function userLogin(body: Authenticator): Promise<SanitizedUser> {
    let user = await authAndGetUser(body)
    await validateUser(user) // For good measure
    return sanitizeUser(user)
}

/**
 * UPDATE: Update some User, authenticating the action first.
 * @param body: UpdateUser
 */
export async function userUpdate(body: UpdateUser): Promise<SanitizedUser> {
    const {auth, update} = body
    let oldUser: User = await authAndGetUser(auth)
    let newUser: User = await UserModel.findOneAndUpdate({email: oldUser.email},
        Object.assign(oldUser, update), {new: true, upsert: false})
    await validateUser(newUser)
    return sanitizeUser(newUser)
}

/**
 * REMOVE: Remove a User, authenticating the action first.
 * @param body: Authenticator
 */
export async function userRemove(body: Authenticator): Promise<SanitizedUser> {
    let user: User = await authAndGetUser(body)
    await UserModel.deleteOne(user) // Match on the entire user, such that no miscalculations can be made
    return sanitizeUser(user)
}

/**
 * GET: Get the details of a User
 * @param params: {i: string, p: string}
 */
export async function userGet(params: any): Promise<SanitizedUser> {
    const {i, p} = params
    return sanitizeUser(await authAndGetUser({identifier: i, password: p}))
}