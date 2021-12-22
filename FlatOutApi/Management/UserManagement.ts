import {UserModel} from "../Schemas/UserSchema";
import {compareHashes, generateIdWithTag, saltAndHash} from "../Util/Crypto";
import {Tag} from "../Util/Constants";
import {checkTokens, createSession} from "./ManagementUtils";
import {SessionModel} from "../Schemas/SessionTokenSchema";

async function checkUserTokens(user: any) {
    await checkTokens([user.group, ...user.groupsByAssociation, ...user.lists])
}

async function newUserSession(user: any){
    user.session = await createSession()
    user.save()
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
    user.password = saltAndHash(body.password)

    // Check each token provided by the user is a valid token
    await checkUserTokens(user)
    await newUserSession(user)
    return sanitizeUser(user)
}

/**
 * LOGIN: Authenticate a user, returning all stored information.
 * @param body
 */
export async function userLogin(body: any): Promise<any> {
    let user: any = body.session ? await sessionAuth(body.session) : await credentialAuth(body.name, body.password)
    await SessionModel.findOneAndRemove({id: user.session})
    // TODO: Update group session
    return user
}

async function sessionAuth(sessionId: string): Promise<any>{
    let documents: any = await SessionModel.countDocuments({id: sessionId})
    if (!documents) throw new Error(`400: Unable to find session ${sessionId}`)
    let user: any = await UserModel.findOne({session: sessionId})
    if (!user) throw new Error(`400: Unable to find user with session ${sessionId}`)
    return user
}

async function credentialAuth(name: string, password: string): Promise<any>{
    let user: any = await UserModel.findOne({name: name})
    if (!user) throw new Error(`400: Unknown user '${name}`)
    if (!compareHashes(password, user.password)) throw new Error(`400: Incorrect password for user ${user.name}`)
    return user
}