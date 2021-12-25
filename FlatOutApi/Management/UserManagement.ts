import {UserModel} from "../Schemas/UserSchema";
import {compareHashes, decomposeAccessToken, generateAccessToken, generateIdWithTag} from "../Util/Crypto";
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

/**
 * CREDENTIAL LOGIN: User has logged in via the name + password method. Generate a token for the user, such that
 * their next login can be automated. Parse the token and user information back to the user.
 * @param body: {id: string, password: string}
 * @param t
 */
export async function userCredLogin(body: any, t?: string): Promise<TokenTuple> {
    // Validate the user
    let user: any = await UserModel.findOne({id: body.id})
    if (!user) throw new Error('400: Cannot find user')
    if (!compareHashes(body.password, user.password)) throw new Error('400: Incorrect Password')

    // Generate a token for the user
    if (!t && body.rememberMe) t = generateAccessToken(body.id + "::" + body.password)
    return {token: t || "", item: sanitizeUser(user)}
}

/**
 * TOKEN LOGIN: User is logging in via a generated token. This token
 * @param body
 */
export async function userTokenLogin(body: any): Promise<any> {
    if (!body.token) throw new Error('400: Missing user token')
    // Extract the user contents
    const decomposed = await decomposeAccessToken(body.token)
    if (typeof decomposed === "string") throw new Error('400: ' + decomposed)
    const [i, p] = decomposed.ust.split(/::/g)

    // Attempt user login
    return userCredLogin({id: i, password: p, rememberMe: body.rememberMe}, body.token)
}
