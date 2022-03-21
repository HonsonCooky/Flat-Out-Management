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
      .then(async (iFomRes: IFomRes) => res.status(200).send(sanitizeRes(iFomRes)))
      .catch((e: any) => next(e))
  }
}

/**
 * SANITIZE DOCUMENT: Before parsing a document back to the client, remove sensitive information that is not
 * necessary to parse back.
 * @param iFomRes
 */
function sanitizeRes(iFomRes: IFomRes): IFomRes {
  fomLogger.info(iFomRes.msg)
  if (!iFomRes.item) return iFomRes

  let {dynUuid, password, parents, children, ...rest} = iFomRes.item.toObject()
  return {
    msg: iFomRes.msg,
    item: rest,
    token: iFomRes.token
  }
}