import {Request, Response} from "express";
import {IFomRes} from "../interfaces/IFomRes";
import {documentRegister} from "./ManagementPartials";
import {ModelEnum} from "../interfaces/FomEnums";


export async function userRegister(req: Request, res: Response): Promise<IFomRes> {
  let user = await documentRegister(ModelEnum.USER, req.body)


  return {
    msg: "here"
  }
}