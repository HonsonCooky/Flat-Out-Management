import {models, Types} from "mongoose";
import {Request, Response} from "express";
import {UserModel} from "../../schemas/documents/UserSchema";
import {compareHashes} from "./AuthenticationPartials";
import {authLevel} from "./GenericPartials";
import {IFomComponent} from "../../interfaces/IFomComponent";
import {IFomAssociation} from "../../interfaces/IFomAssociation";
import {IFomController} from "../../interfaces/IFomController";
import {RoleType} from "../../interfaces/IFomEnums";
import assert from "node:assert";


/**
 * Getting the association between A and B is difficult, however, this recursive method will climb up
 * the parent tree until it has found the component it is looking for. If the component can't be found climbing
 * upwards, then no association exists (assuming parent and child are given in correct order).
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
 * Get a controller from the document db. Either the controller is accessed with username and password,
 * or a JWT.
 * @param r
 */
export async function getController<T extends IFomController>(r: Request | Response): Promise<T> {
  let controller: T | null

  // Response mean JWT
  if ("locals" in r) {
    let {locals} = (r as Response)
    if ((controller = await UserModel.findOne({dynUuid: locals.jwt?.dynUuid}))) return controller
  }
  // Request means username and password
  else if ("body" in r) {
    let {name, password} = (r as Request).body
    controller = await UserModel.findOne({name})
    if (controller && compareHashes(password, controller.password)) return controller
  }

  throw new Error(`400: Invalid authentication`)
}

/**
 * Get a component listed in the Url, with some error checking.
 * @param req
 */
async function getComponentUrl<T extends IFomComponent>(req: Request): Promise<T> {
  let {component, id} = req.params
  let com: T | null = await models[component].findOne({_id: id})
  if (!com) throw new Error(`400: Unable to find ${component} ${id}`)
  return com
}

/**
 * Get a component from a username, and validate it with a password.
 * @param req
 * @param noAuth
 */
async function getComponentUname<T extends IFomComponent>(req: Request, noAuth: boolean = false): Promise<T> {
  let {name, password} = req.body
  let component = await models[req.params.component].findOne({name})
  if (noAuth) return component

  if (component && !compareHashes(password, component.password))
    throw new Error(`400: Invalid component authorization`)

  return component
}

/**
 * Get the component referenced in the request body
 * {
 *   ...
 *   association: {
 *     ref: XXX,
 *     model: YYY,
 *     role: ZZZ
 *   }
 *   ...
 * }
 * @param req
 */
async function getBodyAssociation<T extends IFomComponent | IFomController>(req: Request): Promise<T> {
  let association: IFomAssociation = req.body.association
  let com: T | null = await models[association.model].findOne({_id: association.ref})
  if (!com) throw new Error(`400: Unable to find ${association.model} ${association.ref}`)
  return com
}

/**
 * Get the owner of a new document. When creating a new document, a user may want the owner of
 * the new component to be something else. In which case, an "association" field is placed in the body of the request.
 *
 * If a component is the owner, then we also check that somehow, the user has the authority to do so.
 * @param req
 * @param res
 */
export async function getRegisteringParent(req: Request, res: Response): Promise<IFomController | IFomComponent> {
  let controller: IFomController = await getController(res)
  let component: IFomComponent | null = await getBodyAssociation<IFomComponent>(req).catch((_) => null)

  if (req.body.association && !component) throw new Error('400: Unauthorized use of association')
  if (!component) return controller

  let association: IFomAssociation = await getAssociation(controller._id, component)
  if (authLevel(association.role) > authLevel(RoleType.WRITER)) throw new Error(`400: Unauthorized use of association`)
  return component
}

/**
 * A wrapper to get the controller and component, where the component is embedded into the url. Ensuring a connection
 * between the two already exists.
 * @param req
 * @param res
 */
export async function getUserChildAndRoleUrl<T extends IFomComponent>(req: Request, res: Response):
  Promise<{ controller: IFomController, component: T, role: RoleType }> {

  let controller: IFomController = await getController<IFomController>(res)
  let component: T = await getComponentUrl(req) as T
  let association: IFomAssociation = await getAssociation(controller._id, component)

  return {
    controller,
    component,
    role: association.role
  }
}

/**
 * A wrapper to get the controller and component, where the component is referenced in the request body. Ensuring that
 * the two components are not already connected (Use another method to change users values), and that the password is
 * correct.
 * @param req
 * @param res
 * @param noAuth
 */
export async function getControllerAndComponentUName<T extends IFomComponent>(req: Request, res: Response,
  noAuth: boolean = false):
  Promise<{ controller: IFomController, component: T }> {

  let user: IFomController = await getController<IFomController>(res)
  let child: T = await getComponentUname(req, noAuth) as T
  await assert.rejects(getAssociation(user._id, child), `User ${user.uiName} is already associated with ` +
    `${child.uiName}. Get owner to update your status.`)

  return {
    controller: user,
    component: child,
  }
}