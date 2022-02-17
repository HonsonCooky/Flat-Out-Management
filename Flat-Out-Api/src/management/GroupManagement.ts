import {Request, Response} from "express";
import {IRes} from "../interfaces/FomObjects";

export async function groupRegister(req: Request, res: Response): Promise<IRes> {

  return {
    msg: `Successfully registered`
  }
}