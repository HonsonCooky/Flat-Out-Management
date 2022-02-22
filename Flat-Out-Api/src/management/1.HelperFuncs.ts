import {ModelEnum, RoleEnum} from "../interfaces/GlobalEnums";
import {IDocModelAndRole, IFomObject} from "../interfaces/FomObjects";
import {models, Types} from "mongoose";

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
 * HANDLE ASSOCIATIONS: Remove associations that no longer exist.
 * @param doc
 */
export async function handleAssociations(doc: IFomObject) {
  // Remove all invalid associations
  doc.associations = doc.associations.filter(async (dmr: IDocModelAndRole) => {
    let other: IFomObject | null = await models[dmr.docModel].findOne({_id: dmr.doc})
    if (!other) return false
    return !!other.associations.find((dmr: IDocModelAndRole) => dmr.doc.equals(doc._id))
  })
  await doc.save()
}

/**
 * HANDLE UPDATE: Inform other associations that you have been updated.
 * @param type
 * @param doc
 * @param seen
 */
export async function handleUpdate(type: ModelEnum, doc: IFomObject, seen: Types.ObjectId[] = []){
  seen.push(doc._id) // First document is already updated

  for (let a of doc.associations){
    if (seen.some((id: Types.ObjectId) => id.equals(a.doc))) continue

    let other: IFomObject | null = await models[a.docModel].findOne({_id: a.doc})
    if (!other || other.cacheUpdateRequired) continue

    await other.updateOne({cacheUpdateRequired: true})

    if (type != ModelEnum.TABLE) continue
    await handleUpdate(a.docModel, other, seen)
  }
}