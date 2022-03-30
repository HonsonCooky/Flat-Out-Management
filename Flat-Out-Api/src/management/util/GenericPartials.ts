import {models, Types} from "mongoose";
import {IFomAssociation, IFomComponent, IFomController, ModelType, RoleType} from "flat-out-interfaces";

/**
 * ROLE SCORE: Returns the authority level of the role. 0 being most important.
 * @param role
 */
export function authLevel(role: RoleType): number {
  switch (role) {
    case RoleType.OWNER:
      return 0
    case RoleType.WRITE:
      return 1
    case RoleType.READ:
      return 2
    case RoleType.REQUEST:
      return 3
    default:
      return 4
  }
}

/**
 * GET TYPE FROM DOC: Getters above will find some document, but this method will help identify what that document is.
 * @param doc
 */
export function getTypeFromDoc(doc: IFomController | IFomComponent): ModelType {
  if ("outOfFlatDates" in doc) return ModelType.USER
  if ("groupCalendar" in doc) return ModelType.GROUP
  if ("records" in doc) return ModelType.TABLE
  throw new Error(`500: Unable to find document type`)
}

/**
 * CONNECT DOCUMENTS: Connect a parent and child together
 * @param parent
 * @param child
 * @param role
 */
export async function connectDocuments(
  parent: { item: IFomController | IFomComponent, model: ModelType },
  child: { item: IFomComponent, model: ModelType },
  role: RoleType): Promise<void> {

  parent.item.children = parent.item.children.filter((a: IFomAssociation) => !child.item._id.equals(a.ref))
  parent.item.children.push({ref: child.item._id, model: child.model, role})

  child.item.parents = child.item.parents.filter((a: IFomAssociation) => !parent.item._id.equals(a.ref))
  child.item.parents.push({ref: parent.item._id, model: parent.model, role})

  await parent.item.save()
  await child.item.save()
}


/**
 * REMOVE DOCUMENT FROM ASSOCIATIONS: Before deleting some document, remove its reference from all associations.
 * @param doc
 * @param parents
 * @param children
 */
export async function preDocRemoval(doc: { _id: Types.ObjectId, [key: string]: any },
                                    children: IFomAssociation[], parents?: IFomAssociation[]) {

  if (parents) for await (let parent of parents
    .map(async (a: IFomAssociation) => (await models[a.model]
      .findOne({_id: a.ref}) as IFomController | IFomComponent))) {
    await parent.updateOne({children: parent.children.filter((b: IFomAssociation) => !doc._id.equals(b.ref))})
  }

  for await (let child of children
    .map(async (a: IFomAssociation) => (await models[a.model]
      .findOne({_id: a.ref}) as IFomComponent))) {
    let otherParents = child.parents.filter((b: IFomAssociation) => !doc._id.equals(b.ref))
    if (otherParents.length === 0) await child.deleteOne()
    else await child.updateOne({parents: otherParents})
  }
}