import {Request, Response} from "express";
import {IFomRes} from "../interfaces/IFomRes";
import {ModelEnum, RoleEnum} from "../interfaces/FomEnums";
import {controllerTypeFromUrl, jwtAuth} from "./util/ControllerPartials";
import {IFomController} from "../interfaces/IFomController";
import {componentTypeFromUrl} from "./util/ComponentPartials";
import {models} from "mongoose";
import {saltAndHash} from "./util/AuthPartials";
import {env} from "../config/EnvConfig";

/**
 * COMPONENT REGISTER: Register a non-controller document (component)
 * @param req
 * @param res
 */
export async function componentRegister(req: Request, res: Response): Promise<IFomRes> {
  let controllerType: ModelEnum = controllerTypeFromUrl(req)
  let controller: IFomController = await jwtAuth(controllerType, res.locals.jwt)

  let componentType: ModelEnum = componentTypeFromUrl(req)
  let {uiName, password} = req.body
  await new models[componentType]({
    uiName,
    password: password ? saltAndHash(password) : null,
    fomVersion: env.version,
    parents: [{
      ref: controller._id,
      model: controllerType,
      role: RoleEnum.OWNER
    }]
  }).save()

  return {
    msg: `Successfully register ${componentType} ${uiName} for ${controllerType} ${controller.uiName}`
  }
}

export async function componentConnect(req: Request, res: Response): Promise<IFomRes> {
  let controllerType: ModelEnum = controllerTypeFromUrl(req)
  let controller: IFomController = await jwtAuth(controllerType, res.locals.jwt)

  return {
    msg: `Successfully connected `
  }
}