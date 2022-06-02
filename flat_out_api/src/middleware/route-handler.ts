import {NextFunction, Request, RequestHandler, Response} from "express";
import {FomRes} from "../interfaces/utils/fom-res";

/**
 * Manage the execution and try catching of all functions being called from a URL call.
 * @param fn
 */
export function routeHandler(fn: (req: Request, res: Response) => Promise<FomRes>): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res)
      .then(async (iFomRes: FomRes) => res.status(200).send(sanitizeRes(iFomRes)))
      .catch((e: any) => next(e))
  }
}

/**
 * Before parsing a document back to the client, remove sensitive information that is not
 * necessary to parse back.
 * @param fomRes
 */
function sanitizeRes(fomRes: FomRes): FomRes {
  if (!fomRes.item || !("uiName" in fomRes.item)) return fomRes

  let {dynUuid, password, ...rest} = fomRes.item.toObject()

  return {
    msg: fomRes.msg,
    item: rest
  }
}