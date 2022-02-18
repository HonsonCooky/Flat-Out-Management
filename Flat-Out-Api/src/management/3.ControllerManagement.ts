import {ModelEnum, RoleEnum} from "../interfaces/GlobalEnums";
import {IDocModelAndRole, IFomController, IFomObject} from "../interfaces/FomObjects";
import {models, Types} from "mongoose";
import {nodeAuth, nodeDelete, nodeRegister, nodeUpdate} from "./2.NodeManagement";
import {Request, Response} from "express";
import {strToModel} from "./1.DocManagement";
import {compareHashes} from "./0.AuthFuncs";

/**
 * CONTROLLER REGISTER: Create a controller document.
 * @param type
 * @param body
 */
export function controllerRegister(type: ModelEnum, body: any): IFomController {
  let controller = nodeRegister(type, body) as IFomController
  controller.uuid = new Types.ObjectId()
  return controller
}

/**
 * CONTROLLER AUTH: Authenticate a controller document
 * @param type
 * @param auth
 */
export async function controllerAuth(type: ModelEnum, auth: any): Promise<IFomController> {
  let doc: IFomController | null = !auth.uuid ?
    await nodeAuth(type, auth) as IFomController :
    await models[type].findOne({uuid: auth.uuid})

  if (!doc) throw new Error(`400: Invalid JWT`)
  if (!auth.uuid) {
    doc.uuid = new Types.ObjectId()
    await doc.save()
  }

  return doc
}

/**
 * CONTROLLER UPDATE: Update the contents of a controller. (Currently a wrapper for node update)
 * @param doc
 * @param body
 */
export function controllerUpdate(doc: IFomController, body: IDocModelAndRole | any): void {
  nodeUpdate(doc, body)
}

/**
 * CONTROLLER CONNECT: Connect a controller to some other document. A connection gives a controller some level of
 * authorization over another node.
 * RULES:
 *    1) Controllers cannot connect to other controllers. The connection between a controller and other document,
 *    gives authority to the controller over said document.
 *    2) If a found document is not password protected, it is assumed that, that document is open to all controllers.
 * @param type
 * @param req
 * @param res
 */
export async function controllerConnect(type: ModelEnum, req: Request, res: Response): Promise<void> {
  let controller = await controllerAuth(type, res.locals.jwt)

  let body = req.body, nodeType = strToModel(req.params.type)
  let doc: IFomObject | null = await models[nodeType].findOne({_id: body.doc})

  if (!doc) throw new Error(`400: Unable to find ${nodeType} to connect to`)
  if ("uuid" in doc) throw new Error(`400: NO! You cannot connect to another controller`)
  if (!body.authLevel) throw new Error(`400: Missing connection parameters`)

  if ("password" in doc) {
    body.authLevel = compareHashes(body.password, doc.password) ? body.authLevel : RoleEnum.JOIN_REQUEST
    doc.associations.push({
      doc: controller._id,
      docModel: type,
      role: body.authLevel
    })
    await doc.save()
  }

  controller.associations.push({
    doc: doc._id,
    docModel: nodeType,
    role: body.authLevel
  })

  await controller.save()
}


/**
 * CONTROLLER POPULATE: Validate and populate a
 * @param doc
 */
export async function controllerPopulate(doc: IFomController): Promise<any> {
  // First, get all associations that are real connections
  await doc.populate({
    path: 'associations',

  })
}


/**
 * CONTROLLER DELETE: Delete the contents of a controller. (Currently a wrapper for node delete)
 * @param doc
 */
export async function controllerDelete(doc: IFomController): Promise<void> {
  await nodeDelete(doc)
}