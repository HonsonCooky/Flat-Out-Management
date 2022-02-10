import {IRes} from "../interfaces/_fomObjects";
import {NextFunction, Response} from "express";
import {Promise} from "mongoose";

export function _routeHandler(promise: Promise<IRes>, res: Response, next: NextFunction) {
  promise
    .then((iRes: IRes) => res.status(200).send(_sanitizeDocument(iRes)))
    .catch((e: any) => next(e))
}

function _sanitizeDocument(iRes: IRes): IRes {
  if (!iRes.item) return iRes
  let {_id, uuid, password, ...rest} = iRes.item._doc
  return {
    msg: iRes.msg,
    item: rest,
    token: iRes.token
  }
}