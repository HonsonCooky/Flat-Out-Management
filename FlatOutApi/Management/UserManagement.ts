import {UserModel} from "../Schemas/UserSchema";
import {generateIdWithTag, saltAndHash} from "../Util/Crypto";
import {checkIds} from "./ManagementUtils";
import {Tag} from "../Util/Constants";

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
    user.password = saltAndHash(body.password)

    // Check each token provided by the user is a valid token
    await checkUserTokens(user)
    return sanitizeUser(user)
}