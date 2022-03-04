import {Request, Response} from "express";
import {IFomRes} from "../interfaces/IFomRes";
import {IFomController} from "../interfaces/IFomController";
import {nodeCreate} from "./util/NodePartials";
import {ModelEnum} from "../interfaces/FomEnums";
import {saltAndHash, signJWT} from "./util/AuthPartials";
import {Types} from "mongoose";
import {controllerTypeFromUrl} from "./util/ExtractPartials";
import {JwtAuth, UnamePassAuth} from "./util/ControllerPartials";

/**
 * CONTROLLER REGISTER: Register a controller (user)
 * @param req
 * @param _
 */
export async function controllerRegister(req: Request, _: Response): Promise<IFomRes> {
  let type: ModelEnum = controllerTypeFromUrl(req)
  let controller: IFomController = nodeCreate(type, req.body) as IFomController
  let {name, password} = req.body
  controller.name = name
  controller.password = saltAndHash(password)
  controller.dynUuid = new Types.ObjectId()
  await controller.save()

  return {
    msg: `Successfully created ${type} ${controller.name}`
  }
}

/**
 * CONTROLLER UNAME PASS AUTH: Authenticate a controller with a username and password
 * @param req
 * @param res
 */
export async function controllerUnamePassAuth(req: Request, res: Response): Promise<IFomRes> {
  let type: ModelEnum = controllerTypeFromUrl(req)
  let controller: IFomController = await UnamePassAuth(type, req.body)

  controller.dynUuid = new Types.ObjectId()
  await controller.save()

  let token = signJWT(controller.dynUuid)

  return {
    msg: `Successfully authenticated ${type} ${controller.name}`,
    item: controller,
    token
  }
}

export async function controllerJwtAuth(req: Request, res: Response): Promise<IFomRes> {
  let type: ModelEnum = controllerTypeFromUrl(req)
  let controller: IFomController = await JwtAuth(type, res.locals.jwt)

  return {
    msg: `Successfully authenticated ${type} ${controller.name}`,
    item: controller
  }
}