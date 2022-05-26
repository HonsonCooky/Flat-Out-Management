import {DbEntity} from "../../interfaces/entities/db-entity";
import {DbNonEntity} from "../../interfaces/non-entities/db-non-entity";
import {Association} from "../../interfaces/association";
import {Types} from "mongoose";

async function getAssociation(a: DbEntity, b: DbNonEntity): Promise<Association>;
async function getAssociation(a: DbEntity, b: DbEntity): Promise<Association>;
async function getAssociation(a: DbNonEntity, b: DbEntity): Promise<Association>;
/**
 * Attempt to find the association between A and B. More specifically, find an instance of A, inside B.
 * @param a
 * @param b
 * @param seen
 */
// @ts-ignore
async function getAssociation(a: any, b: any, seen: Types.ObjectId[] = []): Promise<Association> {
  // Collect all the associations B could possibly have
  let associations: Association[] = []
  if ("groups" in b) associations.push(...b.groups)
  if ("users" in b) associations.push(...b.users)
  if ("owner" in b) associations.push(b.owner)
  if ("associations" in b) associations.push(...b.associations)
  if ("calendar" in b) associations.push(b.calendar)
  if ("tables" in b) associations.push(b.tables)

  for (let association of associations) {
    if (association.ref.equals(a._id)) return association
  }
}

