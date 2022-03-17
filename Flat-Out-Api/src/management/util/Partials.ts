import {models, Types} from "mongoose";
import {IFomAssociation} from "../../interfaces/IFomAssociation";
import {Request, Response} from "express";
import {IUser, UserModel} from "../../schemas/documents/UserSchema";
import {compareHashes} from "./BcryptPartials";
import {ModelEnum, RoleEnum} from "../../interfaces/FomEnums";
import {IFomComponent} from "../../interfaces/IFomComponent";
import {IFomController} from "../../interfaces/IFomController";

/**
 * CONNECT DOCUMENTS: Connect a parent and child together
 * @param parent
 * @param child
 * @param role
 */
export async function connectDocuments(
  parent: { item: IFomController | IFomComponent, model: ModelEnum },
  child: { item: IFomComponent, model: ModelEnum },
  role: RoleEnum): Promise<void> {

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
 * @param associations
 */
export async function preDocRemoval(doc: { _id: Types.ObjectId, [key: string]: any },
                                    ...associations: IFomAssociation[]) {
  for (let a of associations) {
    let other: any = await models[a.model].findOne({_id: a.ref})
    if (!other) continue

    if (other.parents) await other.updateOne({
      parents: other.parents
        .filter((b: IFomAssociation) => !doc._id.equals(b.ref))
    })

    if (other.children) await other.updateOne({
      children: other.children
        .filter((b: IFomAssociation) => !doc._id.equals(b.ref))
    })
  }
}

/**
 * GET USER: Get a controller from the document db
 * Either the controller is accessed with username and password, or a JWT
 * @param r
 */
export async function getController<T extends IFomController>(r: Request | Response): Promise<T> {
  let controller: T | null

  // Request means username and password
  if ("body" in r) {
    let {name, password} = (r as Request).body
    controller = await UserModel.findOne({name})
    if (!controller) throw new Error(`400: Invalid user name`)
    if (!compareHashes(password, controller.password)) throw new Error(`400: Invalid user authorization`)
  }
  // Response mean JWT
  else {
    let {locals} = (r as Response)
    controller = await UserModel.findOne({dynUuid: locals.jwt?.dynUuid})
    if (!controller) throw new Error(`400: Invalid JWT`)
  }

  return controller
}

/**
 * GET COMPONENT URL: Get a component listed in the Url, with some error checking
 * @param req
 */
export async function getComponentUrl<T extends IFomComponent>(req: Request): Promise<T> {
  let {component, id} = req.params
  let com: T | null = await models[component]?.findOne({_id: id})
  if (!com) throw new Error(`400: Unable to find ${component} ${id}`)
  return com
}

/**
 * GET COMPONENT BOD: Get the component referenced in the request body
 * @param req
 */
export async function getComponentBod<T extends IFomComponent>(req: Request): Promise<T> {
  let association: IFomAssociation = req.body.association
  let com: T | null = await models[association.model].findOne({_id: association.ref})
  if (!com) throw new Error(`400: Unable to find ${association.model} ${association.ref}`)
  return com
}

/**
 * GET ASSOCIATION: It is possible for some association to be beyond the initial layer of children. Find some
 * reference in the map.
 * @param ref
 * @param child
 * @param seen
 */
export async function getAssociation(
  ref: Types.ObjectId,
  child: IFomComponent,
  seen: Types.ObjectId[] = []): Promise<IFomAssociation> {

  for await (let tuple of child.parents.map(async (a: IFomAssociation) => {
    return {
      item: await models[a.model].findOne({_id: a.ref}, ['_id', 'parents']),
      a: a
    }
  })) {
    let {item, a} = tuple
    if (seen.some((b: Types.ObjectId) => a.ref.equals(b))) break

    if (ref.equals(item._id)) return a

    seen.push(item._id)
    if (item.parents?.length > 0 && await getAssociation(ref, item, seen)) return a
  }

  throw new Error(`400: Unable to find association ${ref} to ${child.uiName}`)
}

/**
 * GET PARENT: The parent is either hidden in a JWT or in the body of a request, as "association"
 * @param req
 * @param res
 */
export async function getParent(req: Request, res: Response): Promise<IFomController | IFomComponent> {
  let user: IUser = await getController<IUser>(res)
  let parent: IFomComponent | IFomController = await getComponentBod(req).catch((e) => {
    if (req.body.association) throw e
    else return user
  })

  if (!user._id.equals(parent._id)) {
    let a = await getAssociation(user._id, parent as IFomComponent)
    console.log(a)
  }

  return parent
}

/**
 * GET PARENT CHILD AND ASSOCIATION: Just get some values (common function)
 * @param req
 * @param res
 */
export async function getParentChildAndAssociation(
  req: Request, res: Response):
  Promise<{ parent: IFomController | IFomComponent, child: IFomComponent, association: IFomAssociation }> {

  let parent: IFomController | IFomComponent | null = await getParent(req, res)
  let child: IFomComponent = await getComponentUrl(req)
  let association = await getAssociation(parent._id, child)

  return {
    parent,
    child,
    association
  }
}

/**
 * GET TYPE FROM DOC: Getters above will find some document, but this method will help identify what that document is.
 * @param doc
 */
export function getTypeFromDoc(doc: IFomController | IFomComponent): ModelEnum {
  if ("outOfFlatDates" in doc) return ModelEnum.USER
  if ("groupCalendar" in doc) return ModelEnum.GROUP
  if ("records" in doc) return ModelEnum.TABLE
  throw new Error(`500: Unable to find document type`)
}