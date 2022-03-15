import {models, Types} from "mongoose";
import {IFomAssociation} from "../../interfaces/IFomAssociation";
import {Request, Response} from "express";
import {UserModel} from "../../schemas/documents/UserSchema";
import {compareHashes} from "./AuthPartials";
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
    controller = await UserModel.findOne({dynUuid: (r as Response).locals.jwt?.dynUuid})
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
 * GET ASSOCIATION: Get the association between a document, and it's user (document is always right).
 * @param parent
 * @param child
 */
export async function getAssociation(
  parent: { _id: Types.ObjectId, [key: string]: any },
  child: IFomComponent): Promise<IFomAssociation> {
  let a: IFomAssociation | undefined = child.parents.find((a: IFomAssociation) => parent._id.equals(a.ref))
  if (!a) throw new Error(`400: User is not associated with this group`)
  return a
}

/**
 * GET PARENT CHILD AND ASSOCIATION: Just get some values (common function)
 * @param req
 * @param res
 */
export async function getParentChildAndAssociation<T extends IFomComponent>(
  req: Request, res: Response): Promise<{ parent: IFomController | IFomComponent, child: T, association: RoleEnum }> {

  let parent: IFomController | IFomComponent = res.locals.jwt ?
    await getController(res) :
    await getComponentBod(req)
  let child: T = await getComponentUrl(req)
  let association = (await getAssociation(parent, child)).role

  return {
    parent,
    child,
    association
  }
}