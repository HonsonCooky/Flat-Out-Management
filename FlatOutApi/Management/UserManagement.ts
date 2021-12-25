import {UserModel} from "../Schemas/UserSchema";
import {compareHashes, generateAccessToken, generateIdWithTag } from "../Util/Crypto";
import {checkIds} from "./ManagementUtils";
import {Tag} from "../Util/Constants";
import {TokenTuple} from "../ReturnTypes/TokenTuple";

async function checkUserTokens(user: any) {
    await checkIds([user.group, ...user.groupsByAssociation, ...user.lists])
}

function sanitizeUser(user: any) {
    const {password, ...sanitized} = user
    return sanitized
}

/** ----------------------------------------------------------------------------------------------------------------
 * API FUNCTIONS
 ------------------------------------------------------------------------------------------------------------------- */
/**
 * CREATE: Create a User document
 * @param body: User
 */
export async function userCreate(body: any): Promise<any> {
    // Setup user object
    let user: any = new UserModel(body)
    user.id = generateIdWithTag(Tag.User)

    // Check each token provided by the user is a valid token
    await checkUserTokens(user)
    await user.save()
    return user.id
}

export async function userCredLogin(body: any): Promise<TokenTuple> {
    // Validate the user
    let user: any = await UserModel.findOne({id: body.id})
    if (!user) throw new Error('400: Cannot find user')
    console.log(compareHashes(body.password, user.password))
    console.log(body.password, user.password)
    if (!compareHashes(body.password.trim(), user.password)) throw new Error('400: Incorrect Password')

    // Generate a token for the user
    const token = generateAccessToken(body.id + "-" + body.password)

    return {
        token: token,
        item: user
    }
}
