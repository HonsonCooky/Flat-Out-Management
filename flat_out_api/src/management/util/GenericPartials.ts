import {models, Types} from "mongoose";
import {ModelType, RoleType} from "../../interfaces/IFomEnums";
import {IFomController} from "../../interfaces/IFomController";
import {IFomComponent} from "../../interfaces/IFomComponent";
import {IFomAssociation} from "../../interfaces/IFomAssociation";

/**
 * Enums are string values, enables easier front end development (flutter).
 * As such, this helper method provides authorization enums with a integer value. Higher = less authorization.
 * @param role
 */
export function authLevel(role: RoleType): number {
  switch (role) {
    case RoleType.OWNER:
      return 0
    case RoleType.WRITER:
      return 1
    case RoleType.READER:
      return 2
    case RoleType.REQUEST:
      return 3
    default:
      return 4
  }
}

/**
 * Get the ModelType based on the contents of the document. Usually used for when a component is unknown.
 * @param doc
 */
export function getTypeFromDoc(doc: IFomController | IFomComponent): ModelType {
  if ("outOfFlatDates" in doc) return ModelType.USER
  if ("groupCalendar" in doc) return ModelType.GROUP
  if ("records" in doc) return ModelType.TABLE
  throw new Error(`500: Unable to find document type`)
}

/**
 * Connect a parent and child together. Seems straight forward, but some necessary checks are put in place just incase.
 * @param parent
 * @param child
 * @param role
 */
export async function connectDocuments(
  parent: { item: IFomController | IFomComponent, model: ModelType },
  child: { item: IFomComponent, model: ModelType },
  role: RoleType): Promise<void> {

  if (child.model === ModelType.USER) throw new Error('400: Users connect together via groups, not via each other')

  if (parent.item.children.some((a: IFomAssociation) => a.ref.equals(child.item._id)) ||
    child.item.parents.some((a: IFomAssociation) => a.ref.equals(parent.item._id))
  ) throw new Error("400: Documents are already connected")

  parent.item.children = [...parent.item.children, {ref: child.item._id, model: child.model, role}]
  await parent.item.save();

  child.item.parents = [...child.item.parents, {ref: parent.item._id, model: parent.model, role}]
  await child.item.save()
}


/**
 * Due to the connected nature of this backend, document removal is slightly more complicated. Removing a document
 * means removing it from all associations. In cases where this is the last parent of some association, then the
 * association must also be deleted (else we risk losing a reference to the document)
 * @param doc
 * @param parents
 * @param children
 */
export async function preDocRemoval(doc: { _id: Types.ObjectId, [key: string]: any },
  children: IFomAssociation[], parents?: IFomAssociation[]) {

  // Remove child from parents
  if (parents) for await (let parent of parents
    .map(async (a: IFomAssociation) => (await models[a.model]
      .findOne({_id: a.ref}) as IFomController | IFomComponent))) {
    await parent.updateOne({children: parent.children.filter((b: IFomAssociation) => !doc._id.equals(b.ref))})
  }

  // Remove parent from children
  for (let child of children) {
    let component: IFomComponent | null = await models[child.model].findOne({_id: child.ref});
    if (!component) continue

    // We are the last user of this component, remove it, before we remove all means of connecting to it.
    if (component.parents.length === 1) {
      await component.deleteOne();
      continue;
    }

    // Filter out this child
    let otherParents: IFomAssociation[] = component.parents.filter((b: IFomAssociation) => !doc._id.equals(b.ref))

    // Re-associate ownership if needed
    if (child.role === RoleType.OWNER
      && otherParents.filter((b: IFomAssociation) => b.role === RoleType.OWNER).length === 0) {
      let potentialOwners: IFomAssociation[] = otherParents.filter((b: IFomAssociation) => b.role === RoleType.WRITER);

      // If no other owners can associate to this one, then simply delete
      if (potentialOwners.length === 0) {
        await component.deleteOne();
        continue;
      }

      for (let po of potentialOwners) {
        let parent: IFomAssociation | undefined = otherParents.find(
          (a: IFomAssociation) => a.ref.equals(potentialOwners[0].ref))
        if (!parent) continue;
        parent.role = RoleType.OWNER
        break;
      }
    }

    await component.updateOne({parents: otherParents})
  }
}


/**
 * Overwrite current associations with new ones
 * @param refArr
 * @param update
 * @param requiresOwner
 */
export async function componentUpdateConnections(refArr: IFomAssociation[], update: IFomAssociation[],
  requiresOwner: boolean = true): Promise<IFomAssociation[]> {
  if (!update) return refArr

  // Remove duplicates
  update = update.filter((value, index, self) =>
    index === self.findIndex((t) => t.ref === value.ref)
  )

  // Remove references that have no DB counterpart
  update =
    await Promise.all(update.filter(async (ca: IFomAssociation) => !!(await models[ca.model].findOne({_id: ca.ref}))))

  // Ensure that some reference to this component remains
  if (update.length === 0) throw new Error('400: No more parents after update. Try delete instead?')

  // Ensure at least one OWNER remains
  if (requiresOwner && !update.some((a: IFomAssociation) => a.role === RoleType.OWNER))
    throw new Error('400: Updates leave remove an owner. Components require an owner')

  return update
}