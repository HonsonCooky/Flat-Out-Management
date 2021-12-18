import {saltAndHash} from "../Util/UtilFunctions";
import {SanitizedUser, User, UserModel} from "../Schemas/UserSchema";
import {randomUUID} from "crypto";

/** ----------------------------------------------------------------------------------------------------------------
 * UTIL FUNCTIONS
 ------------------------------------------------------------------------------------------------------------------- */
function sanitizeUser({id, name, group, groupsByAssociation, lists}: SanitizedUser): SanitizedUser {
    return {id, name, group, groupsByAssociation, lists}
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
    body.id = 'U-' + randomUUID()
    body.password = saltAndHash(body.password)
    await validateUser(body)
    await new UserModel(body).save()
    return sanitizeUser(body)
}