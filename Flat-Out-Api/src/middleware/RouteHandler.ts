import {IRes, JwtAuthContract} from "../interfaces/FomObjects";
import {NextFunction, Request, RequestHandler, Response} from "express";

/**
 * ROUTE HANDLER: Manage the execution and try catching of all functions being called from a URL call.
 * @param fn
 */
export function routeHandler(fn: (body: any, jwt?: JwtAuthContract) => Promise<IRes>): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req.body, res.locals.jwt)
      .then(async (iRes: IRes) => res.status(200).send(await sanitizeRes(iRes)))
      .catch((e: any) => next(e))
  }
}

/**
 * SANITIZE DOCUMENT: Before parsing a document back to the client, remove sensitive information that is not
 * necessary to parse back.
 * @param iRes
 */
async function sanitizeRes(iRes: IRes): Promise<IRes> {
  if (!iRes.item) return iRes
  let {_id, uuid, password, readAuthLevel, writeAuthLevel, ...rest} = iRes.item._doc
  return {
    msg: iRes.msg,
    item: rest,
    token: iRes.token
  }
}