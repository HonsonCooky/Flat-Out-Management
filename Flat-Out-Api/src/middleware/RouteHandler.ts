import {NextFunction, Request, RequestHandler, Response} from "express";
import {IFomRes} from "../interfaces/IFomRes";
import {fomLogger} from "../config/Logger";

/**
 * ROUTE HANDLER: Manage the execution and try catching of all functions being called from a URL call.
 * @param fn
 */
export function routeHandler(fn: (req: Request, res: Response) => Promise<IFomRes>): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res)
      .then(async (iRes: IFomRes) => res.status(200).send(sanitizeRes(iRes)))
      .catch((e: any) => next(e))
  }
}

/**
 * SANITIZE DOCUMENT: Before parsing a document back to the client, remove sensitive information that is not
 * necessary to parse back.
 * @param iRes
 */
function sanitizeRes(iRes: IFomRes): IFomRes {
  fomLogger.info(iRes.msg)
  if (!iRes.item) return iRes

  let {dynUuid, password, parents, children, ...rest} = iRes.item.toObject()
  return {
    msg: iRes.msg,
    item: rest,
    token: iRes.token
  }
}