import {IRes} from "../interfaces/IFomJwtContract";
import {NextFunction, Request, RequestHandler, Response} from "express";

/**
 * ROUTE HANDLER: Manage the execution and try catching of all functions being called from a URL call.
 * @param fn
 */
export function routeHandler(fn: (req: Request, res: Response) => Promise<IRes>): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res)
      .then(async (iRes: IRes) => res.status(200).send(sanitizeRes(iRes)))
      .catch((e: any) => next(e))
  }
}

/**
 * SANITIZE DOCUMENT: Before parsing a document back to the client, remove sensitive information that is not
 * necessary to parse back.
 * @param iRes
 */
function sanitizeRes(iRes: IRes): IRes {
  if (!iRes.item) return iRes
  let {_id, uuid, docName, password, associations, ...rest} = iRes.item._doc
  return {
    msg: iRes.msg,
    item: rest,
    token: iRes.token
  }
}