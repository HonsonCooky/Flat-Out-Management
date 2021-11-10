import {User, UserModel} from "./Schemas";

/**
 * Signup the user. If they already exist, then simply update all information (back to defaults).
 * This can be used to reset an account.
 * @param body
 */
export async function signup(body: any) {
    let user: User = body as User

    let missingFields: string[] = []
    if (!user.email) missingFields.push("email")
    if (!user.username) missingFields.push("username")
    if (!user.password) missingFields.push("password")
    if (!user.group) missingFields.push("group")

    if (missingFields.length > 0) throw new Error(`400:Failed to register user. Missing fields '${missingFields.join(", ")}'`)

    if (!user.nickname) user.nickname = user.username
    if (!user.lists) user.lists = []

    let userSchema = new UserModel({
        email: user.email,
        username: user.username,
        password: user.password,
        nickname: user.nickname,
        group: user.group,
        lists: user.lists
    })

    let errMsg;
    if((errMsg = userSchema.validateSync()) != null) throw new Error("400:" + errMsg.message)

    await UserModel.findOneAndUpdate({email: user.email}, userSchema, {new: true, upsert: true})
}