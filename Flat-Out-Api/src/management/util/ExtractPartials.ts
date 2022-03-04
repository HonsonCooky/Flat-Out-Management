import {Request} from "express";
import {ModelEnum} from "../../interfaces/FomEnums";

export function controllerTypeFromUrl(req: Request): ModelEnum {
  return <ModelEnum>req.originalUrl.split('/')[3]
}

export interface TypeAndId {
  type: ModelEnum,
  id: string
}

export function componentTypeAndIdFromUrl(req: Request) {
}