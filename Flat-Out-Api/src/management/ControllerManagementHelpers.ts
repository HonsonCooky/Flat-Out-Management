import {ModelEnum} from "../interfaces/GlobalEnums";
import {IDocModelAndRole, IFomController} from "../interfaces/FomObjects";
import {models, Types} from "mongoose";
import {nodeAuth, nodeDelete, nodeRegister, nodeUpdate} from "./NodeManagementHelpers";

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
 * CONTROLLER DELETE: Delete the contents of a controller. (Currently a wrapper for node delete)
 * @param doc
 */
export async function controllerDelete(doc: IFomController): Promise<void> {
  await nodeDelete(doc)
}