import {DbObj, DbObjRef, getObjFromRef, getObjValue, objToAssociation} from "./db-object-handling";
import {Association, ModelType, RoleType} from "../../../interfaces/association";
import {DbNonEntity} from "../../../interfaces/non-entities/db-non-entity";

/**
 * Connect component A to component B. This method overrides existing connections, and does NOT check that A or B
 * has authority to do so. It's merely a helper function to ensure A has some connection to B, and B has some
 * connection to A.
 * @param comA Some DB component or Association
 * @param comB Another DB component or Association
 * @param options <br/>
 * **role:** The role type of the connection from A to B (default REQUEST, lowest)<br/>
 * **override:** If true, will override any association with the same reference (default true)<br/>
 * **strict:** If true, will throw an error if some association already exists. This ignores override. (default false)
 */
export async function connectComponents(comA: DbObjRef, comB: DbObjRef,
  options: { role: RoleType, override: boolean, strict: boolean } = {
    role: RoleType.REQUEST,
    override: true,
    strict: false
  }) {
  let aObj = await getObjFromRef(comA)
  let bObj = await getObjFromRef(comB)
  if (!aObj || !bObj) throw new Error(`400: Attempting to connect objects, of which one doesn't exist`)

  try {
    await connectOneWay(aObj, bObj, options) // Create B Association in A
    await connectOneWay(bObj, aObj, options) // Create A Association in B
  } catch (e) {
    // Disconnect the objects before throwing the error
    await disconnectComponents(comA, comB)
    throw e
  }
}

/**
 * Connects A to B (used above to go both ways, removes duplicate code).
 * Furthermore, this method checks the type of object A by analysing its fields (those used to connect to other
 * objects). The ONE field that this connection does NOT cover, is the {@link DbNonEntity} 'owner' field. This has
 * another helper method elsewhere in the project, which has necessary checks to ensure that the entity enacting
 * said action has the authorization to do so.
 * @param aObj
 * @param bObj
 * @param options
 */
async function connectOneWay(aObj: DbObj, bObj: DbObj,
  options: { role: RoleType, override: boolean, strict: boolean }) {
  let bAss = await objToAssociation(bObj, options.role)

  if ("associations" in aObj) {
    let newAssociation = await filterThroughOptions(aObj, aObj.associations, bAss, options)
    if (newAssociation) aObj.associations.push(bAss)
  } else if ("groups" in aObj && bAss.model === ModelType.GROUP) {
    let newAssociation = await filterThroughOptions(aObj, aObj.groups, bAss, options)
    if (newAssociation) aObj.groups.push(bAss)
  } else if ("users" in aObj && bAss.model === ModelType.USER) {
    let newAssociation = await filterThroughOptions(aObj, aObj.users, bAss, options)
    if (newAssociation) aObj.users.push(bAss)
  } else if ("tables" in aObj && bAss.model === ModelType.TABLE) {
    let newAssociation = await filterThroughOptions(aObj, aObj.tables, bAss, options)
    if (newAssociation) aObj.tables.push(bAss)
  } else if ("calendar" in aObj && bAss.model === ModelType.CALENDAR) {
    let newAssociation = await filterThroughOptions(aObj, aObj.calendar, bAss, options)
    if (newAssociation) aObj.calendar = bAss
  } else throw new Error(`400: Unable to connect ${getObjValue(aObj)}`)


  // Save the changes, ensuring all validation logic is adhered to. Also ensuring that this object exists in the DB
  // for when B connects to A.
  await aObj.save()
}

/**
 * Provides a method for ensuring that options are executed. Also ensures that previous associations are
 * disconnected before reconnecting them.
 * @param aObj
 * @param curValue
 * @param addAssociation
 * @param options
 */
async function filterThroughOptions(aObj: DbObj, curValue: undefined | Association | Association[],
  addAssociation: Association, options: { override: boolean, strict: boolean }): Promise<Association | undefined> {

  let curAssociation = getAssociationFromCurValue(curValue, addAssociation)

  if (options.strict || !options.override) {
    if (curAssociation) {
      if (options.strict) throw new Error('400: Components are already connected')
      return undefined
    }
  }

  // Disconnect from the previous connection
  if (curAssociation) {
    await disconnectComponents(aObj, curAssociation)
  }

  return addAssociation
}

/**
 * Confirm if some association already exists.
 * @param curValue
 * @param association
 */
function getAssociationFromCurValue(curValue: undefined | Association | Association[],
  association: Association): Association | undefined {
  if (Array.isArray(curValue)) return curValue.find((a) => a.ref.equals(association.ref))
  return curValue
}


/**
 * Disconnect A from B, and B from A. This helper function does not check that A has the authority to make these
 * overriding changes. Furthermore, this method either works, or it doesn't. Most errors are avoided.
 * @param comA
 * @param comB
 */
export async function disconnectComponents(comA: DbObjRef, comB: DbObjRef) {
  let aObj = await getObjFromRef(comA)
  let bObj = await getObjFromRef(comB)
  if (!aObj || !bObj) throw new Error(`400: Attempting to connect objects, of which one doesn't exist`)

  try {
    await disconnectOneWay(aObj, bObj)
    await disconnectOneWay(bObj, aObj)
  } catch (e) {
    // Means they weren't connected in the first place
  }
}

async function disconnectOneWay(aObj: DbObj, bObj: DbObj) {

}