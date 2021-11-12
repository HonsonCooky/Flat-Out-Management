import {AuthenticationUser, SanitizedUser, UpdateUser, User, UserModel} from "../Util/Schemas";
import {compareHashes, saltAndHash} from "../Util/UtilFunctions";

/** ----------------------------------------------------------------------------------------------------------------
 * UTIL FUNCTIONS
 ------------------------------------------------------------------------------------------------------------------- */
/**
 * A simple conversion from a MongoDB user, to a SanitizedUser. This enables the internal calls to access all the
 * information of the user, but the sanitized user is the JSON object that is parsed to the client. Removing
 * information that is not-relevant, or needs to be kept secret.
 * @param user: User
 */
function sanitizeUser(user: User): SanitizedUser {
    return {
        email: user.email,
        username: user.username,
        nickname: user.nickname,
        group: user.group,
        lists: user.lists || []
    }
}

/**
 * Get the User from the MongoDB collection, and check that a given password is the same as the stored password. The
 * method will throw errors in cases where something is wrong.
 * @param auth: AuthenticationUser
 */
async function authAndGetUser(auth: AuthenticationUser): Promise<User> {
    // Check the user exists
    let user: User = await UserModel.findOne({
        $or: [{email: auth.identifier.toLowerCase()}, {username: auth.identifier.toLowerCase()}]
    })
    if (user === null) throw new Error(`400:Cannot find user ${auth.identifier}`)

    // Check the password for user is correct
    if (!auth.password || !compareHashes(auth.password, user.password)) {
        throw new Error(`400:Incorrect password, but we do know that user ${user.username} exists`)
    }

    return user
}

/**
 * The user schema has some inbuilt middleware validations. This function ensures that whatever JSON object is
 * parsed in, conforms to the necessary structure of the UserSchema.
 * @param user: User
 */
async function validateUser(user: User) {
    let errMsg = new UserModel(user).validateSync()
    if (errMsg != null) throw new Error("400:" + errMsg.message.replace(/,/g, "\n").replace(/:/, ''))
}

/** ----------------------------------------------------------------------------------------------------------------
 * API FUNCTIONS
 ------------------------------------------------------------------------------------------------------------------- */

/**
 * SIGNUP: Given a JSON body, the signup acts as an interface to fill, validate, and enter a USER document into the
 * 'users' MongoDB collection. Note, errors are thrown to indicate the presence of some issue.
 * @param user: User
 */
export async function userSignup(user: User): Promise<SanitizedUser> {
    if (!user.nickname) user.nickname = user.username
    if (!user.lists) user.lists = []
    user.password = saltAndHash(user.password)
    await validateUser(user)
    await new UserModel(user).save()
    return sanitizeUser(user)
}

/**
 * LOGIN: Given a JSON body, the login acts as an interface to authenticate an attempted login by some user.
 * Firstly, it validates the existence, and correctness of the user through a email/username and password. Then it
 * validates that the user stored is a valid user. Finally, it sanitized the JSON object such that only relevant
 * information is given back to the user.
 * @param body: AuthenticationUser
 */
export async function userLogin(body: AuthenticationUser): Promise<SanitizedUser> {
    let user = await authAndGetUser(body)
    await validateUser(user) // For good measure
    return sanitizeUser(user)
}

/**
 * UPDATE: Given a JSON body, the update function acts as an interface to authenticate then update, a pre-existing
 * user in the MongoDB 'users' collection.
 * @param body: UpdateUser
 */
export async function userUpdate(body: UpdateUser): Promise<SanitizedUser> {
    const {auth, update} = body
    let oldUser: User = await authAndGetUser(auth)
    let newUser: User = await UserModel.findOneAndUpdate({email: oldUser.email}, Object.assign(oldUser, update), {
        new: true,
        upsert: false
    })
    return sanitizeUser(newUser)
}

/**
 * The remove function is slightly different, but will follow the same footprint as before. Removing the user from
 * the MongoDB 'users' collection will simply delete the user account. Like most actions, this requires a password
 * such that no one can do this on accident, or without intentional bad design.
 * @param body: AuthenticationUser
 */
export async function userRemove(body: AuthenticationUser): Promise<SanitizedUser> {
    let user: User = await authAndGetUser(body)
    await UserModel.deleteOne(user) // Match on the entire user, such that no miscalculations can be made
    return sanitizeUser(user)
}

export async function userGet(params: any): Promise<SanitizedUser> {
    const {u, p} = params
    return sanitizeUser(await authAndGetUser({identifier: u, password: p}))
}