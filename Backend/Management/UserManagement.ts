import {User, UserModel} from "./Schemas";
import {compareHashes, saltAndHash} from "../Util/UtilFunctions";

/**
 * Signup the user. If they already exist, then simply update all information (back to defaults).
 * This can be used to reset an account.
 * @param body
 */
export async function signup(body: any) {
    let user: User = body as User

    // Test body for correct fields. Although others may be present, those are unused, and useless.
    let missingFields: string[] = []
    if (!user.email) missingFields.push("email")
    if (!user.username) missingFields.push("username")
    if (!user.password) missingFields.push("password")
    if (!user.group) missingFields.push("group")
    // Given a missing MANDATORY field, throw a CLIENT error.
    if (missingFields.length > 0) throw new Error(`400:Failed to register user. Missing fields '${missingFields.join(", ")}'`)

    // Fix missing NON-MANDATORY fields.
    if (!user.nickname) user.nickname = user.username
    if (!user.lists) user.lists = []

    // Hash the password and create a UUID
    user.password = saltAndHash(user.password)

    let userSchema = new UserModel({
        email: user.email,
        username: user.username,
        password: user.password,
        nickname: user.nickname,
        group: user.group,
        lists: user.lists
    })

    let errMsg;
    if((errMsg = userSchema.validateSync()) != null) throw new Error("400:" + errMsg.message.replace(/,/g, "\n").replace(/:/, ''))

    return UserModel.findOneAndUpdate({email: user.email}, userSchema, {upsert: true})
}

/**
 * Login the user
 * @param body
 */
export async function login(body: any): Promise<User> {
    if (!body.identifier || !body.password) throw new Error('400:Login requires username and password')
    let user = await UserModel.findOne({email: body.identifier})
    if (user === null) user = await UserModel.findOne({username: body.identifier})
    if (user === null) throw new Error(`400:Cannot find user ${body.identifier}`)
    if (!body.password || !compareHashes(body.password, user.password)){throw new Error("Unable to login")}
    return user as User
}