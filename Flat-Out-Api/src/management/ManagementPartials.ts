import {ModelEnum} from "../interfaces/FomEnums";
import {IFomDocument} from "../interfaces/IFomDocument";
import {models} from "mongoose";
import {saltAndHash} from "./0.AuthFuncs";
import {env} from "../config/EnvConfig";


export async function documentRegister(type: ModelEnum, body: any): Promise<IFomDocument> {
  return new models[type]({
    name: body.name,
    password: body.password ? saltAndHash(body.password) : "",
    fomVersion: env.version
  })
}