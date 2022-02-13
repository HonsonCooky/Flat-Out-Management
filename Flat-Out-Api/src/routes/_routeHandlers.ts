import {IRes} from "../interfaces/_fomObjects";
import {NextFunction, Request, Response} from "express";
import {ModelEnum} from "../interfaces/_enums";

/**
 * ROUTE HANDLER: Manage the execution and try catching of all functions being called from a URL call.
 * @param promise
 * @param res
 * @param next
 */
export async function _routeHandler(promise: Promise<IRes>, res: Response, next: NextFunction) {
  promise
    .then(async (iRes: IRes) => res.status(200).send(await _sanitizeDocument(iRes)))
    .catch((e: any) => next(e))
}

/**
 * SANITIZE DOCUMENT: Before parsing a document back to the client, remove sensitive information that is not
 * necessary to parse back.
 * @param iRes
 */
async function _sanitizeDocument(iRes: IRes): Promise<IRes> {
  if (!iRes.item) return iRes
  let {_id, uuid, password, ...rest} = iRes.item._doc
  return {
    msg: iRes.msg,
    item: rest,
    token: iRes.token
  }
}


/**
 * EXTRACT MODEL: Each URL will start with what model is being impacted. For generic function, finding this starting
 * value means that consequent actions can impact the MongoDB in a specific manner.
 * @param req
 */
export function extractModel(req: Request): ModelEnum {
  let modelStr = req.originalUrl.split('/')[1]
  if (!Object.values(ModelEnum).includes(<ModelEnum>modelStr)) throw new Error(`400: Unknown generic model`)
  return <ModelEnum>modelStr
}