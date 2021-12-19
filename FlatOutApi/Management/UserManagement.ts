import {generateIdWithTag, saltAndHash} from "../Util/UtilFunctions";
import {SanitizedUser, User, UserModel} from "../Schemas/UserSchema";
import {Tag} from "../Util/Constants";
import {validateModel} from "./ManagementUtils";

/** ----------------------------------------------------------------------------------------------------------------
 * UTIL FUNCTIONS
 ------------------------------------------------------------------------------------------------------------------- */
function sanitizeUser({id, name, group, groupsByAssociation, lists}: SanitizedUser): SanitizedUser {
    return {id, name, group, groupsByAssociation, lists}
}

/** ----------------------------------------------------------------------------------------------------------------
 * API FUNCTIONS
 ------------------------------------------------------------------------------------------------------------------- */

/**
 * CREATE: Create a User document
 * @param body: User
 */
export async function userCreate(body: User): Promise<SanitizedUser> {
    body.id = generateIdWithTag(Tag.User)
    body.password = saltAndHash(body.password)
    validateModel(body, UserModel)
    await new UserModel(body).save()
    return sanitizeUser(body)
}