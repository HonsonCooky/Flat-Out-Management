import {UserModel} from "../Schemas/UserSchema";
import {generateIdWithTag, saltAndHash} from "../Util/Crypto";
import {Tag} from "../Util/Constants";
import {checkTokens, createSession, sanitizeObj, validateModel} from "./ManagementUtils";

async function checkUserTokens(user: any) {
    await checkTokens([user.group, ...user.groupsByAssociation, ...user.lists])
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

    // Generate the required id first (overwrite)
    user.id = generateIdWithTag(Tag.User)

    // Validate the creation based on incoming information
    validateModel(user, UserModel)

    // Salt and Hash the user password
    user.password = saltAndHash(body.password)

    // Check each token provided by the user is a valid token
    await checkUserTokens(user)

    // Successful session started
    user.session = await createSession()

    // Save to DB and return to user
    validateModel(user, UserModel) // Check one last time before saving

    await user.save()
    return sanitizeObj(user)
}

/**
 * LOGIN: Authenticate a user, either by id, or by
 * @param body
 */
export async function userLogin(body: any): Promise<any> {

}