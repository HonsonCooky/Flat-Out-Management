import {Request, Response} from "express";
import {IFomRes} from "../interfaces/IFomRes";
import {IFomController} from "../interfaces/IFomController";
import {ModelEnum} from "../interfaces/FomEnums";
import {saltAndHash, signJWT} from "./util/AuthPartials";
import {models, Types} from "mongoose";
import {controllerTypeFromUrl, jwtAuth, unamePassAuth} from "./util/ControllerPartials";
import {IFomComponent} from "../interfaces/IFomComponent";
import {getComponentFromAssociation} from "./util/ComponentPartials";
import {IFomAssociation} from "../interfaces/IFomAssociation";
import {env} from "../config/EnvConfig";

/**
 * CONTROLLER REGISTER: Register a controller (user)
 * @param req
 * @param _
 */
export async function controllerRegister(req: Request, _: Response): Promise<IFomRes> {
  let controllerType: ModelEnum = controllerTypeFromUrl(req)
  let {name, uiName, password} = req.body

  await new models[controllerType]({
    name,
    uiName: uiName ?? name,
    password: saltAndHash(password),
    dynUuid: new Types.ObjectId(),
    fomVersion: env.version
  }).save()

  return {
    msg: `Successfully created ${controllerType} ${uiName}`
  }
}

/**
 * CONTROLLER UNAME PASS AUTH: Authenticate a controller with a username and password
 * @param req
 * @param res
 */
export async function controllerUnamePassAuth(req: Request, res: Response): Promise<IFomRes> {
  let controllerType: ModelEnum = controllerTypeFromUrl(req)
  let controller: IFomController = await unamePassAuth(controllerType, req.body)

  controller.dynUuid = new Types.ObjectId()
  await controller.save()

  let token = signJWT(controller.dynUuid)

  return {
    msg: `Successfully authenticated ${controllerType} ${controller.uiName}`,
    item: controller,
    token
  }
}

/**
 * CONTROLLER JWT AUTH: Authenticate a controller with a JWT
 * @param req
 * @param res
 */
export async function controllerJwtAuth(req: Request, res: Response): Promise<IFomRes> {
  let controllerType: ModelEnum = controllerTypeFromUrl(req)
  let controller: IFomController = await jwtAuth(controllerType, res.locals.jwt)

  return {
    msg: `Successfully authenticated ${controllerType} ${controller.uiName}`,
    item: controller
  }
}

/**
 * CONTROLLER DELETE: Remove a controller.
 * @param req
 * @param res
 */
export async function controllerDelete(req: Request, res: Response): Promise<IFomRes> {
  let controllerType: ModelEnum = controllerTypeFromUrl(req)
  let controller: IFomController = await unamePassAuth(controllerType, req.body)

  for (let child of controller.children) {
    let component: IFomComponent | null = await getComponentFromAssociation(child)
    if (!component) continue

    await component.updateOne({
      parents: component.parents
        .filter((association: IFomAssociation) => !association.ref.equals(controller._id))
    })
  }

  await controller.deleteOne()

  return {
    msg: `Successfully deleted ${controllerType} ${controller.uiName}`,
    item: controller
  }
}

/**
 * CONTROLLER UPDATE MAJOR: Update the username or password of a controller.
 * @param req
 * @param res
 */
export async function controllerUpdateMajor(req: Request, res: Response): Promise<IFomRes> {
  let controllerType: ModelEnum = controllerTypeFromUrl(req)
  let controller: IFomController = await unamePassAuth(controllerType, req.body)

  let {newName, newPassword} = req.body
  await controller.updateOne({
    name: newName ?? controller.name,
    password: newPassword ? saltAndHash(newPassword) : controller.password
  })

  return {
    msg: `Successfully updated ${controllerType} ${controller.uiName}`,
    item: controller
  }
}

/**
 * CONTROLLER UPDATE MINOR: Update the contents of a controller (that aren't important, can be done).
 * @param req
 * @param res
 */
export async function controllerUpdateMinor(req: Request, res: Response): Promise<IFomRes> {
  let controllerType: ModelEnum = controllerTypeFromUrl(req)
  let controller: IFomController = await jwtAuth(controllerType, res.locals.jwt)

  let {uiName} = req.body
  await controller.updateOne({
    uiName: uiName ?? controller.uiName
  })

  return {
    msg: `Successfully updated ${controllerType} ${controller.uiName}`,
    item: controller
  }
}