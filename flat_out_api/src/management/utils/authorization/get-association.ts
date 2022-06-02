import {Association, ModelType, RoleType, roleVal} from "../../../interfaces/association";
import {models, Types} from "mongoose";
import {FomUser} from "../../../interfaces/entities/fom-user";
import {FomGroup} from "../../../interfaces/entities/fom-group";
import {FomCalendar} from "../../../interfaces/non-entities/fom-calendar";
import {FomTable} from "../../../interfaces/non-entities/fom-table";
import {DbEntity} from "../../../interfaces/entities/db-entity";
import {DbNonEntity} from "../../../interfaces/non-entities/db-non-entity";

type FromObjectType = FomUser | FomGroup | FomCalendar | FomTable | DbEntity | DbNonEntity
type FromType = FromObjectType | Association
type FindType = FromType | Types.ObjectId

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
export async function getAssociation(from: FromType, find: FindType, seen: Types.ObjectId[] = [],
  minRole: RoleType = RoleType.REQUEST,): Promise<Association> {

  // Place the 'from' object into the pile of seen objects
  let fromId = getFromTypeId(from)
  seen.push(fromId)

  // Convert 'from' and 'find' into components that can be used for the evaluation
  let fromObject = await getFromObject(from)
  if (!fromObject) throw new Error('Attempting to find association without a reference')
  let findId = getFindTypeId(find)

  // Attempt to find in this object
  if (isFindInFrom(fromObject, findId, seen)) return {
    ref: fromObject._id,
    model: getFromObjectModel(fromObject),
    role: RoleType.WRITER, // Correction will be made in the case where getting here is a lower value
    value: fromObject.name
  }

  // Attempt to find the association via other associations
  return searchAssociations(fromObject, findId, seen)
}

/**
 * Helper function to extract the ObjectId from some {@link FromType}
 * @param from
 */
function getFromTypeId(from: FromType): Types.ObjectId {
  if ("_id" in from) return from._id
  if ("ref" in from) return from.ref
  throw new Error('Unable to find id that distinguishes object')
}

/**
 * Helper function to extract the ObjectId from some {@link FindType}
 * @param find
 */
function getFindTypeId(find: FindType): Types.ObjectId {
  if (find instanceof Types.ObjectId) return find
  return getFromTypeId(find)
}

/**
 * Translates a FromType into a guaranteed FromObject (or null if it doesn't exist)
 * @param from
 */
async function getFromObject(from: FromType): Promise<FromObjectType | null> {
  if (!("ref" in from)) return from
  return models[from.model].findOne({_id: from.ref});
}

function getFromObjectModel(fromObject: FromObjectType): ModelType {
  if ("groups" in fromObject) return ModelType.USER
  if ("users" in fromObject) return ModelType.GROUP
  if ("colLength" in fromObject) return ModelType.TABLE
  if ("events" in fromObject) return ModelType.CALENDAR
  throw new Error('Attempting to find model type without a valid reference')
}

/**
 * Search A DbObject to see if any of its components are the link we are looking for. Here, we are not concerned
 * with associations, but merely if some object is/contains the id we are looking for. We DO NOT search through
 * Associations (those are done separately).
 * @param from
 * @param find
 * @param seen
 */
function isFindInFrom(from: FromType, find: Types.ObjectId, seen: Types.ObjectId[]): boolean {
  let objectConnections: Types.ObjectId[] = []
  if ("_id" in from) objectConnections.push(from._id)
  if ("ref" in from) objectConnections.push(from.ref)
  if ("ui" in from && from.ui.avatar) objectConnections.push(from.ui.avatar)
  if ("jwtUuid" in from) objectConnections.push(from.jwtUuid)
  // We don't look through Table Cells, because frankly, there is a better way to find an association to a table.
  return objectConnections.some((id: Types.ObjectId) => id.equals(find));
}

/**
 * Extracts all the Associations that from could possibly have.
 * @param from
 */
function getAllAssociations(from: FromType): Association[] {
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
 * Search the list of associations for some link to
 * @param from
 * @param find
 * @param seen
 */
async function searchAssociations(from: FromObjectType, find: Types.ObjectId, seen: Types.ObjectId[])
  : Promise<Association> {

  for (let association of getAllAssociations(from)) {
    if (seen.some((id: Types.ObjectId) => id.equals(association.ref))) continue
    if (association.ref.equals(find._id)) return association
    try {
      let nestedAssociation = await getAssociation(association, find, seen)
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
