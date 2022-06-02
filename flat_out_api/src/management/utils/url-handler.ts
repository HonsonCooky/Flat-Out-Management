import {Request} from "express";
import {ModelType} from "../../interfaces/association";

/**
 * Extract the {@link ModelType} that is listed in the URL.
 * @param req
 */
export function getUrlModelType(req: Request): ModelType {
  if (!req.params.model) throw new Error('400: Malformed url request. No Model')
  return <ModelType>req.params.model
}