import {DbObj, DbObjRef, getObjFromRef, objToAssociation} from "./db-object-handling";
import {Association, ModelType, RoleType} from "../../../interfaces/association";

/**
 * Connect component A to component B. This method overrides existing connections, and does NOT check that A or B
 * has authority to do so. It's merely a helper function to ensure A has some connection to B, and B has some
 * connection to A.
 * @param comA Some DB component or Association
 * @param comB Another DB component or Association
 * @param options <br/>**role:** The role type of the connection from A to B (default REQUEST, lowest)<br/>
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

  // DbNonEntity | FomCalendar | FomTable
  if ("associations" in aObj)
    await addWithEnforceOptions(aObj.associations, bAss, options)
  // DbEntity | FomUser | FomGroup
  else if ("tables" in aObj && bAss.model === ModelType.TABLE)
    await addWithEnforceOptions(aObj.tables, bAss, options)
  else if ("calendar" in aObj && bAss.model === ModelType.CALENDAR)
    await addWithEnforceOptions(aObj.calendar, bAss, options)
  else {
    throw new Error('Unable to connect components. Unknown location to store association')
  }

  // Save the changes, ensuring all validation logic is adhered to. Also ensuring that this object exists in the DB
  // for when B connects to A.
  await aObj.save()
}

/**
 * Add an association to some list, enforcing the options
 * @param connector
 * @param association
 * @param options
 */
async function addWithEnforceOptions(connector: (Association | undefined) | Association[], association: Association,
  options: { role: RoleType, override: boolean, strict: boolean }) {
  // STRICT and NOT OVERRIDE have a similar idea. If some association exists, then don't attempt the connection.
  // The only difference is in how this is handled.
  if (options.strict || !options.override) {
    if (associationExists(connector, association)) {
      if (options.strict) throw new Error('Attempted to connect components that are already associated')
      else return
    }
  }

  // Override is TRUE and Strict is False
  if (!Array.isArray(connector)) {
    if (connector) await disconnectComponents(connector, association)
    connector = association
    return
  }

  connector = connector.filter((a: Association) => !a.ref.equals(association.ref))
  connector.push(association)
}

/**
 * Check to see if some connection (reference in A from B) already exists.
 * @param connector
 * @param association
 */
function associationExists(connector: (Association | undefined) | Association[], association: Association): boolean {
  if (Array.isArray(connector)) return connector.some((a: Association) => a.ref.equals(association.ref))
  return !!connector
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