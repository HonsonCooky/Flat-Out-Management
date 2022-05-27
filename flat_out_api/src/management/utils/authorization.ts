import {DbEntity} from "../../interfaces/entities/db-entity";
import {DbNonEntity} from "../../interfaces/non-entities/db-non-entity";
import {Association, roleVal} from "../../interfaces/association";
import {models, Types} from "mongoose";

export async function getAssociation(a: DbEntity, b: DbNonEntity, seen?: Types.ObjectId[]): Promise<Association>;
export async function getAssociation(a: DbEntity, b: DbEntity, seen?: Types.ObjectId[]): Promise<Association>;
export async function getAssociation(a: DbNonEntity, b: DbEntity, seen?: Types.ObjectId[]): Promise<Association>;
/**
 * Attempt to find the association between A and B. More specifically, find an instance of B, from A's associations.
 * @param from The DbObject who's associations we are looking through
 * @param find The DbObject we are trying to find an association to
 * @param seen (Hidden) The list of visited associations
 * @return An association for 'find'. Role will be altered to have the least authorization in the chain.
 */
// @ts-ignore
export async function getAssociation(from: any, find: any, seen: Types.ObjectId[] = []): Promise<Association> {
  // 'Seen' this association
  seen.push(from._id)

  // Collect all the associations B could possibly have
  let associations: Association[] = []
  // Entities
  if ("calendar" in from) associations.push(from.calendar)
  if ("tables" in from) associations.push(...from.tables)
  if ("groups" in from) associations.push(...from.groups)
  if ("users" in from) associations.push(...from.users)
  // Non entities
  if ("owner" in from) associations.push(from.owner)
  if ("associations" in from) associations.push(...from.associations)

  // Remove all associations that were undefined or null (just in case)
  associations = associations.filter((association: Association) => !!association)

  for (let association of associations) {
    // Association found, stop the search
    if (association.ref.equals(find._id)) return association

    if (seen.some((id: Types.ObjectId) => id.equals(association.ref))) continue // We've already traversed this path

    // Depth first search
    let document = await models[association.model].findOne({_id: association.ref})
    if (!document) continue // Not our problem

    try {
      let nestedAssociation = await getAssociation(document, find, seen)
      // No error, so we must have found one
      return {
        ref: nestedAssociation.ref,
        model: nestedAssociation.model,
        role: roleVal(nestedAssociation.role) > roleVal(association.role) ? nestedAssociation.role : association.role,
        value: nestedAssociation.value
      }
    } catch (e) {
    }
  }

  throw new Error(`400: No association between ${from._id} and ${find._id}`)
}

