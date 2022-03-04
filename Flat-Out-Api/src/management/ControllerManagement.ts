import {Request, Response} from "express";
import {IFomRes} from "../interfaces/IFomRes";
import {IFomController} from "../interfaces/IFomController";
import {createNode} from "./util/ManagementPartials";
import {ModelEnum} from "../interfaces/FomEnums";
import {saltAndHash} from "./util/AuthPartials";
import {Types} from "mongoose";


export async function controllerRegister(req: Request, _: Response): Promise<IFomRes> {
  let user: IFomController = createNode(ModelEnum.USER, req.body) as IFomController
  let {name, password} = req.body
  user.name = name
  user.password = saltAndHash(password)
  user.dynUuid = new Types.ObjectId()
  await user.save()

  return {
    msg: `Successfully created user ${user.uiName}`
  }
}