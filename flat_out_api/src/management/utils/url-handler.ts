import {Request} from "express";
import {ModelType} from "../../interfaces/association";

export function extractModelType(req: Request): ModelType {
  if (!req.params.model) throw new Error('400: Malformed url request. No Model')
  return <ModelType>req.params.model
}