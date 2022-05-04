import {NextFunction, Request, RequestHandler, Response} from "express";
import {fomLogger} from "../config/Logger";
import {IFomRes} from "../interfaces/IFomRes";

/**
 * Manage the execution and try catching of all functions being called from a URL call.
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
 * Before parsing a document back to the client, remove sensitive information that is not
 * necessary to parse back.
 * @param iFomRes
 */
function sanitizeRes(iFomRes: IFomRes): IFomRes {
  fomLogger.info(iFomRes.msg)
  if (!iFomRes.item || !("_id" in iFomRes.item)) return iFomRes

  let {dynUuid, password, ...rest} = iFomRes.item.toObject()
  rest.token = iFomRes.token

  return {
    msg: iFomRes.msg,
    item: rest
  }
}