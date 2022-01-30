import {safeUpdate, sanitize, save} from "./_Utils";
import {GroupModel} from "../Schemas/GroupSchema";
import {authGetDocuments} from "./_Authentication";
import {FOMReq, FOMRes} from "../Interfaces/UtilInterfaces";


/** ----------------------------------------------------------------------------------------------------------------
 * LOCAL HELPER FUNCTIONS
 ------------------------------------------------------------------------------------------------------------------- */

/** ----------------------------------------------------------------------------------------------------------------
 * API FUNCTIONS
 ------------------------------------------------------------------------------------------------------------------- */
/**
 * CREATE: Create a new Group document.
 * @param body
 */
export async function groupCreate(body: FOMReq): Promise<FOMRes> {
  return {
    item: sanitize(await save(new GroupModel(safeUpdate(body)), true)),
    msg: `Successfully created group`
  }
}

/**
 * LOGIN: A group login only requires user authentication, and a check that the user is in the group. If the user is
 * in the group, they have authenticated themselves previous, and don't require to do it again. This removes
 * duplicating authentication standards in place for the user.
 * @param body
 */
export async function groupLogin(body: FOMReq): Promise<FOMRes> {
  return {
    item: sanitize((await authGetDocuments(body)).group.item),
    msg: `Successful group login`
  }
}