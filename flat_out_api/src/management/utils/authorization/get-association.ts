import {Association, RoleType, roleVal} from "../../../interfaces/association";
import {Types} from "mongoose";
import {DbIdRef, DbObj, DbObjRef, getObjFromRef, getObjId, objToAssociation} from "./db-object-handling";

/**
 * This is a recursive function that searches for some link between 'from' and 'find'. The search begins at 'from'
 * and continues to query all possible links to find 'find'. 'find' is simply an id of some sort. This can be a
 * reference to some association between A and B, or a particular subcomponent of some unknown object (e.g. an
 * Avatar's Id).
 * @param from Provides a way to get all query-able components.
 * @param find Provides a target id to find.
 * @param minRole The minimum role some association can have. Throws error if we can't find an association with AT
 * LEAST this RoleType. If an association is found that has a lower RoleType than this, keep searching. If you just
 * want the fastest way to find an association between A and B, then leave this alone.
 * @param seen A list of all the associations that have been searched
 */
export async function getAssociation(from: DbObjRef, find: DbIdRef, seen: Types.ObjectId[] = [],
  minRole: RoleType = RoleType.REQUEST): Promise<Association> {
  // Place the 'from' object into the pile of seen objects
  let fromId = getObjId(from)
  seen.push(fromId)

  // Convert 'from' and 'find' into components that can be used for the evaluation
  let fromObject = await getObjFromRef(from)
  if (!fromObject) throw new Error('Attempting to find association without a reference')
  let findId = getObjId(find)

  // Attempt to find in this object. Use the 'WRITER' role, as any connections with a lesser role before this will
  // overwrite it. If this id is in the object (without other connections), then we have a writer role.
  if (isFindInFrom(fromObject, findId)) return objToAssociation(fromObject, RoleType.WRITER)

  // Attempt to find the association via other associations
  return searchAssociations(fromObject, findId, seen, minRole)
}


/**
 * Extracts all the Associations that from could possibly have.
 * @param from
 */
function getAllAssociations(from: DbObj): Association[] {
  let associations: Association[] = []
  // FomUser
  if ("groups" in from) associations.push(...from.groups)
  // FomGroup
  if ("users" in from) associations.push(...from.users)
  // FomUser | FomGroup
  if ("calendar" in from && from.calendar) associations.push(from.calendar)
  if ("tables" in from) associations.push(...from.tables)
  // FomCalendar | FomTable
  if ("owner" in from) associations.push(from.owner)
  if ("associations" in from) associations.push(...from.associations)

  // Safeguard against null | undefined
  associations = associations.filter((association: Association) => !!association)
  return associations
}

/**
 * Search A DbObject to see if any of its components are the link we are looking for. Here, we are not concerned
 * with associations, but merely if some object is/contains the id we are looking for. We DO NOT search through
 * Associations (those are done separately).
 * @param from
 * @param find
 */
function isFindInFrom(from: DbObjRef, find: Types.ObjectId): boolean {
  let objectConnections: Types.ObjectId[] = []
  if ("_id" in from) objectConnections.push(from._id)
  if ("ref" in from) objectConnections.push(from.ref)
  if ("ui" in from && from.ui.avatar) objectConnections.push(from.ui.avatar)
  if ("jwtUuid" in from) objectConnections.push(from.jwtUuid)
  // We don't look through Table Cells, because frankly, there is a better way to find an association to a table.
  return objectConnections.some((id: Types.ObjectId) => id.equals(find));
}

/**
 * Search through all the associations of this DB object, and see if any of those associations are the one we are
 * looking for.
 * @param from
 * @param find
 * @param seen
 * @param minRole
 */
async function searchAssociations(from: DbObj, find: Types.ObjectId, seen: Types.ObjectId[], minRole: RoleType)
  : Promise<Association> {
  for (let association of getAllAssociations(from)) {
    if (seen.some((id: Types.ObjectId) => id.equals(association.ref))) continue
    if (isFindInFrom(association, find)) return association
    try {
      let nestedAssociation = await getAssociation(association, find, seen)
      if (roleVal(nestedAssociation.role) > roleVal(minRole)) continue

      return {
        ref: nestedAssociation.ref,
        model: nestedAssociation.model,
        role: roleVal(nestedAssociation.role) > roleVal(association.role) ? nestedAssociation.role : association.role,
        value: nestedAssociation.value
      }
    } catch (e) {
      // Not our issue
    }
  }

  throw new Error('400: Invalid authorization to complete action')
}
