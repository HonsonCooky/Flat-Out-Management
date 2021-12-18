/** ----------------------------------------------------------------------------------------------------------------
 * UTIL FUNCTIONS
 ------------------------------------------------------------------------------------------------------------------- */
import {saltAndHash} from "../Util/UtilFunctions";
import {List, ListModel} from "../Schemas/ListSchema";

async function authAndGetList(identifier: string): Promise<List> {
    // Check if list exists, simply having the key is enough for access
    if (!identifier) throw new Error('400:List needs a key to be identified!')
    let list: List = await ListModel.findOne({key: identifier.toLowerCase()})
    if (!list) throw new Error(`400: Cannot find list ${identifier}`)
    return list
}

async function validateList(list: List) {
    let errMsg = new ListModel(list).validateSync()
    if (errMsg) throw new Error("400:" + errMsg.message.replace(/,/g, "\n").replace(/:/, ''))
}

/** ----------------------------------------------------------------------------------------------------------------
 * API FUNCTIONS - LISTS
 ------------------------------------------------------------------------------------------------------------------- */

/**
 * CREATE: Create a List document
 * @param body
 */
export async function listCreate(body: List): Promise<List>{
    // Fix holes in object
    if (body.listName) body.key = saltAndHash(body.listName)
    if (!body.listItems) body.listItems = []
    // Validate and create
    await validateList(body)
    await new ListModel(body).save()
    return body
}

/**
 * UPDATE: Override the pre-existing list with same key. This can be used to add, remove items from a list.
 * @param body
 */
export async function listUpdate(body: List): Promise<List>{
    let oldList: List = await authAndGetList(body.key)
    let oldKey: string = oldList.key

    // Apply update locally and validate
    let newList = Object.assign(oldList, body)
    await validateList(newList)

    // Passing validation, update the MongoDB instance
    await ListModel.findOneAndUpdate({key: oldKey}, newList, {new: true, upsert: false, runValidators: true})
    return newList
}

/**
 * GET: Get a List document.
 * @param params
 */
export async function listGet(params: any): Promise<List>{
    return authAndGetList(params['k'] + params['0'])
}