import {Request, Response} from "express";
import {IFomRes} from "../interfaces/IFomRes";
import {UserModel} from "../schemas/documents/UserSchema";
import {compareHashes, saltAndHash} from "./util/AuthPartials";
import {Types} from "mongoose";
import {IFomController} from "../interfaces/IFomController";
import {signJWT} from "./util/SignJwt";
import {removeDocumentFromAssociations} from "./util/partials";


/**
 * Get a user from the document db
 * @param r
 */
async function getUser(r: Request | Response): Promise<IFomController> {
  // If this is a request
  if ("body" in r) {
    let {name, password} = (r as Request).body
    let controller: IFomController | null = await UserModel.findOne({name})
    if (!controller) throw new Error(`400: Invalid user name`)
    if (!compareHashes(password, controller.password)) throw new Error(`400: Invalid user authorization`)
    return controller
  }
  // Else it's jwt
  else {
    let controller: IFomController | null = await UserModel.findOne({dynUuid: (r as Response).locals.jwt})
    if (!controller) throw new Error(`400: Invalid JWT`)
    return controller
  }
}


/**
 * USER REGISTER: Create a new user document
 * @param req
 * @param res
 */
export async function userRegister(req: Request, res: Response): Promise<IFomRes> {
  let {name, password, uiName} = req.body
  await new UserModel({
    name,
    password: saltAndHash(password),
    uiName: uiName ?? name,
    dynUuid: new Types.ObjectId()
  }).save()

  return {
    msg: `Successfully registered user ${uiName ?? name}`
  }
}

/**
 * USER LOGIN: Authenticate user
 * @param req
 * @param res
 */
export async function userLogin(req: Request, res: Response): Promise<IFomRes> {
  let controller: IFomController = await getUser(req)
  let token: string = signJWT(controller, req.body.expiresIn)

  return {
    msg: `Successfully logged in user ${controller.uiName}`,
    item: controller,
    token
  }
}

/**
 * USER DELETE: Delete a user from the document db
 * @param req
 * @param res
 */
export async function userDelete(req: Request, res: Response): Promise<IFomRes> {
  let controller: IFomController = await getUser(req)
  await removeDocumentFromAssociations(controller, ...controller.children)
  await controller.deleteOne()

  return {
    msg: `Successfully deleted user ${controller.uiName}`,
    item: controller
  }
}

/**
 * USER UPDATE: Update a user document
 * @param req
 * @param res
 */
export async function userUpdate(req: Request, res: Response): Promise<IFomRes> {
  let {newName, newPassword, uiName} = req.body
  let controller: IFomController

  if (newName || newPassword) {
    controller = await getUser(req)
    controller.name = newName ?? controller.name
    controller.password = saltAndHash(newPassword) ?? controller.password
  } else {
    controller = await getUser(res)
  }

  controller.uiName = uiName ?? controller.uiName
  await controller.save()

  return {
    msg: `Successfully updated user ${controller.uiName}`,
    item: controller
  }
}