import {models, Types} from "mongoose";
import {IFomComponent} from "../../interfaces/IFomComponent";
import {IFomAssociation} from "../../interfaces/IFomAssociation";
import {IFomController} from "../../interfaces/IFomController";
import {Request, Response} from "express";
import {UserModel} from "../../schemas/documents/UserSchema";
import {compareHashes} from "./AuthenticationPartials";
import {RoleEnum} from "../../interfaces/FomEnums";
import {IFomUser} from "../../interfaces/IFomUser";
import {authLevel} from "./GenericPartials";


/**
 * GET ASSOCIATION: Getting the association between A and B is difficult, however, the
 * @param parentGiven
 * @param child
 * @param seen
 */
async function getAssociation(
  parentGiven: Types.ObjectId,
  child: IFomComponent,
  seen: Types.ObjectId[] = []): Promise<IFomAssociation> {

  let filtered = child.parents.filter((a: IFomAssociation) => !seen.some((b: Types.ObjectId) => a.ref.equals(b)))
  for await (let parentAssociation of filtered) {
    // If this is the reference, then return it
    if (parentGiven.equals(parentAssociation.ref)) return parentAssociation

    // Else get the item, push it onto the seen pile
    let parentFound = await models[parentAssociation.model].findOne({_id: parentAssociation.ref}, ['_id', 'parents'])
    seen.push(parentFound._id)

    // Attempt to get the ref from the item (parent's parent, etc)
    // return this association (which will eventually lead back to the direct association from the
    let foundParentAssociation = await getAssociation(parentGiven, parentFound, seen).catch(_ => null)
    if (foundParentAssociation) return authLevel(foundParentAssociation.role) > authLevel(parentAssociation.role) ?
      foundParentAssociation : parentAssociation
  }

  throw new Error(`400: Unable to find association ${parentGiven} to ${child.uiName}`)
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
    if (controller && compareHashes(password, controller.password)) return controller
  }
  // Response mean JWT
  else if (r.locals?.jwt) {
    let {locals} = (r as Response)
    if ((controller = await UserModel.findOne({dynUuid: locals.jwt?.dynUuid}))) return controller
  }

  throw new Error(`400: Invalid authentication`)
}

/**
 * GET COMPONENT URL: Get a component listed in the Url, with some error checking
 * @param req
 */
async function getComponentUrl<T extends IFomComponent>(req: Request): Promise<T> {
  let {component, id} = req.params
  let com: T | null = await models[component]?.findOne({_id: id})
  if (!com) throw new Error(`400: Unable to find ${component} ${id}`)
  return com
}

/**
 * GET COMPONENT BOD: Get the component referenced in the request body
 * @param req
 */
async function getComponentBod<T extends IFomComponent>(req: Request): Promise<T> {
  let association: IFomAssociation = req.body.association
  let com: T | null = await models[association.model].findOne({_id: association.ref})
  if (!com) throw new Error(`400: Unable to find ${association.model} ${association.ref}`)
  return com
}

/**
 * GET REGISTERING PARENT: Get the owner of a new document.
 * @param req
 * @param res
 */
export async function getRegisteringParent(req: Request, res: Response): Promise<IFomController | IFomComponent> {
  let controller: IFomController = await getController(res)
  let component: IFomComponent | null =  await getComponentBod(req).catch((_) => null)
  if (!component) return controller

  let association: IFomAssociation = await getAssociation(controller._id, component)
  if (authLevel(association.role) > authLevel(RoleEnum.WRITE)) throw new Error(`400: Unauthorized use of component`)
  return component
}

/**
 * GET USER CHILD AND ASSOCIATION: Get the user attempting to make an action, get the child they're trying to enact
 * on, and get the role (of less authorization) between the documents. (If user is owner of group, and group is
 * reader of table, then the association between user and table is reader)
 * @param req
 * @param res
 */
export async function getUserChildAndRole<T extends IFomComponent>(req: Request, res: Response):
  Promise<{ user: IFomUser, child: T, role: RoleEnum }> {

  let user: IFomUser = await getController<IFomUser>(res)
  let child: T = await getComponentUrl(req) as T
  let association: IFomAssociation = await getAssociation(user._id, child)

  return {
    user,
    child,
    role: association.role
  }
}