import {models, Types} from "mongoose";
import {Association, ModelType, RoleType} from "../../../interfaces/association";
import {DbNonEntity} from "../../../interfaces/non-entities/db-non-entity";
import {DbEntity} from "../../../interfaces/entities/db-entity";
import {FomTable} from "../../../interfaces/non-entities/fom-table";
import {FomCalendar} from "../../../interfaces/non-entities/fom-calendar";
import {FomGroup} from "../../../interfaces/entities/fom-group";
import {FomUser} from "../../../interfaces/entities/fom-user";

/**An actual instance of a DB object*/
type DbObjInstance = FomUser | FomGroup | FomCalendar | FomTable
/**A generic instance of a DB object (parent interface). Although these are used in code, we can usually guarantee
 *  that at runtime, this will be an actual instance. For typescript and generic functionality, this must be included*/
type DbObjGeneric = DbEntity | DbNonEntity
/**Any db object*/
export type DbObj = DbObjInstance | DbObjGeneric
/**A reference to a DB object which can be used to get the object (either it already is, or has enough information
 *  to extract from DB*/
export type DbObjRef = DbObj | Association
/**An object which carries (or is) an id of some DB component*/
export type DbIdRef = DbObjRef | Types.ObjectId

/**
 * Helper function to extract the ObjectId from some instance that might contain a link
 * @param idRef
 */
export function getObjId(idRef: DbIdRef): Types.ObjectId {
  if (idRef instanceof Types.ObjectId) return idRef
  if ("_id" in idRef) return idRef._id
  if ("ref" in idRef) return idRef.ref
  throw new Error('Unable to find id that distinguishes object')
}

/**
 * Helper function to translate some reference to a DB Object into a guaranteed DB object
 * @param ref
 */
export async function getObjFromRef(ref: DbObjRef): Promise<DbObj> {
  if (!("ref" in ref)) return ref
  let obj = await models[ref.model].findOne({_id: ref.ref});
  if (!obj) throw new Error(`Object reference does not resolve with a valid database entry`)
  return obj
}

/**
 * Get an object's model from the object instance (based on unique field in object)
 * Although a generic DbEntity or DbNonEntity can be parsed through, in reality, we are often referencing a DbObject
 * that has come from one of the four defined collections.
 *
 * If we have been parsed a purely generic DbEntity/DbNonEntity, then functionally we have an error. So throw one.
 * @param obj
 */
export function getObjModel(obj: DbObj): ModelType {
  if ("groups" in obj) return ModelType.USER
  if ("users" in obj) return ModelType.GROUP
  if ("colLength" in obj) return ModelType.TABLE
  if ("events" in obj) return ModelType.CALENDAR
  throw new Error('Attempting to find model type without a valid reference')
}

/**
 * Extract the frontend value from some object. Either it has a '.ui.name' value, or it has a '.name' value.
 * @param obj
 */
export function getObjValue(obj: DbObj): string {
  if ("ui" in obj) return obj.ui.name
  return obj.name
}

/**
 * Convert some object into an association. By default, any function that does not parse a role type, will have
 * {@link RoleType.REQUEST} value (the least amount of privilege possible).
 *
 * In reality, this function is just a combination of the above functions, put into a helpful method.
 * @param ref
 * @param role
 */
export async function objToAssociation(ref: DbObjRef, role: RoleType = RoleType.REQUEST): Promise<Association> {
  let obj = await getObjFromRef(ref)
  let id = getObjId(ref)
  let model = getObjModel(obj)
  let value = getObjValue(obj)

  return {
    ref: id,
    model,
    role,
    value
  }
}