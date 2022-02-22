import {ModelEnum, RoleEnum} from "../interfaces/GlobalEnums";
import {IDocModelAndRole, IFomController, IFomObject} from "../interfaces/FomObjects";
import {models, Types} from "mongoose";
import {componentAuth, componentDelete, componentRegister, componentUpdate} from "./2.ComponentManagement";
import {Request, Response} from "express";
import {strToModel} from "./1.HelperFuncs";
import {compareHashes} from "./0.AuthFuncs";

/**
 * CONTROLLER REGISTER: Create a controller document.
 * @param type
 * @param body
 */
export function controllerRegister(type: ModelEnum, body: any): IFomController {
  let controller = componentRegister(type, body) as IFomController
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
    await componentAuth(type, auth) as IFomController :
    await models[type].findOne({uuid: auth.uuid})

  if (!doc) throw new Error(`400: Invalid JWT`)
  if (!auth.uuid) {
    doc.uuid = new Types.ObjectId()
    await doc.save()
  }

  return doc
}

/**
 * CONTROLLER UPDATE: Update the contents of a controller. (Currently a wrapper for component update)
 * @param type
 * @param doc
 * @param body
 * @param informOthers
 */
export async function controllerUpdate(type: ModelEnum, doc: IFomController, body: any, informOthers: boolean = false): Promise<void> {
  await componentUpdate(type, doc, body, informOthers)
}

/**
 * CONTROLLER CONNECT: Connect a controller to some other document. A connection gives a controller some level of
 * authorization over another node.
 * RULES:
 *    1) Controllers cannot connect to other controllers. The connection between a controller and other document,
 *    gives authority to the controller over said document.
 *    2) If a found document is not password protected, it is assumed that, that document is open to all controllers.
 * @param type
 * @param req {
 *   jwt: JwtAuthContract
 *   body: {
 *    doc: Types.ObjectId
 *    password: string
 *    authLevel: Requested RoleEnum
 *   }
 * }
 * @param res
 */
export async function controllerConnect(type: ModelEnum, req: Request, res: Response): Promise<void> {
  let controller = await controllerAuth(type, res.locals.jwt)

  let body = req.body
  let componentType = strToModel(req.params.type)
  let component: IFomObject | null = await models[componentType].findOne({docName: body.doc})

  if (!component) throw new Error(`400: Unable to find ${componentType} to connect to`)
  if ("uuid" in component) throw new Error(`400: NO! You cannot connect to another controller`)

  if (!body.authLevel) throw new Error(`400: Missing connection parameters`)

  if (compareHashes(body.password, component.password)) {
    let admin = component.associations.find((dmr: IDocModelAndRole) => dmr.role === RoleEnum.ADMIN)
    body.authLevel = admin ? body.authLevel : RoleEnum.JOIN_REQUEST
  } else body.auhLevel = RoleEnum.JOIN_REQUEST

  // Remove associations with this id
  component.associations = component.associations.filter((dmr: IDocModelAndRole) => !dmr.doc.equals(controller._id))
  component.associations.push({
    doc: controller._id,
    docModel: type,
    role: body.authLevel
  })
  await component.save()

  // Remove associations with component id
  controller.associations = controller.associations.filter((dmr: IDocModelAndRole) => !component?._id.equals(dmr.doc._id))
  controller.associations.push({
    doc: component._id,
    docModel: componentType,
    role: body.authLevel
  })

  await controller.save()
}


/**
 * CONTROLLER POPULATE: Validate and populate a
 * @param seen
 * @param a
 */
let haveSeen = (seen: Types.ObjectId[], a: Types.ObjectId): boolean => seen.some((id: Types.ObjectId) => id.equals(a._id))

export async function controllerPopulate(type: ModelEnum, doc: IFomController) {
  await recControllerPop(doc, doc, type)
  await doc.save()
}

async function recControllerPop(doc: IFomController,
                                curDoc: any,
                                type: ModelEnum,
                                seen: Types.ObjectId[] = [],
                                curPath: string = "") {

  if (!doc.cacheUpdateRequired) return
  if (haveSeen(seen, curDoc._id)) return

  doc.cache = []
  doc.cacheUpdateRequired = false

  let pop: any = await curDoc.populate({
    path: 'associations.doc',
    select: [
      "uiName",
      "fomVersion",
      "readAuthLevel",
      "writeAuthLevel",
      "associations",
      "cacheUpdateRequired",
      "createdAt",
      "updatedAt",

      // Group
      "groupCalendar",

      // Table
      "numOfCols",
      "titleRow",
      "contentRows",
    ]
  })

  let nonControllers: any[] = pop.associations.filter((dmr: any) => dmr.docModel != ModelEnum.USER)

  for (let other of nonControllers) {
    let p = curPath + `/${other.docModel}`
    await recControllerPop(doc, other.doc, other.docModel, seen, p)
    let {associations, ...rest} = other.doc._doc

    doc.cache.push({
      path: p,
      obj: rest,
      objModel: other.docModel,
      role: other.role
    })
  }
}

/**
 * CONTROLLER DELETE: Delete the contents of a controller. (Currently a wrapper for component delete)
 * @param doc
 */
export async function controllerDelete(doc: IFomController): Promise<void> {
  await componentDelete(doc)
}