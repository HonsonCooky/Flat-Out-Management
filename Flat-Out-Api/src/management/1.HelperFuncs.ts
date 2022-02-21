import {ModelEnum, RoleEnum} from "../interfaces/GlobalEnums";
import {IDocModelAndRole, IFomObject} from "../interfaces/FomObjects";
import {models} from "mongoose";

/**
 * STRING TO MODEL: Convert a string to a ModelEnum.
 * @param str
 */
export function strToModel(str: String): ModelEnum {
  if (!Object.values(ModelEnum).includes(<ModelEnum>str)) throw new Error(`400: Invalid model type provided`)
  return <ModelEnum>str
}

/**
 * STRING TO ROLE: Convert a string to a RoleEnum.
 * @param str
 */
export function strToRole(str: String): RoleEnum {
  if (!Object.values(RoleEnum).includes(<RoleEnum>str)) throw new Error(`400: Invalid role type provided`)
  return <RoleEnum>str
}


/**
 * HANDLE ASSOCIATIONS: Remove associations that no longer exist, and tell Controllers if the current object has
 * been updated (they need to update their cache).
 * @param doc
 * @param updated
 */
export async function handleAssociations(doc: IFomObject, updated: boolean = false) {
  // Remove all invalid associations
  doc.associations = doc.associations.filter(async (dmr: IDocModelAndRole) => {
    let other: IFomObject | null = await models[dmr.docModel].findOne({_id: dmr.doc})
    if (!other) return false
    return !!other.associations.find((dmr: IDocModelAndRole) => dmr.doc.equals(doc._id))
  })

  await doc.save()

  // If this document has been updated, then all associated controllers need to be told to update
  if (updated) await informControllers(doc)
}

async function informControllers(doc: IFomObject) {

}