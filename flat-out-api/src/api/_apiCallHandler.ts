import {FOMReq, FOMRes} from "../interfaces/_fomObjects";

export function handlePostCall(fn: (params: string[], body: FOMReq) => Promise<FOMRes>, req: any, res: any, next: any) {
  fn(req.params, req.body)
    .then((fomRes: FOMRes) => res.status(200).send(fomRes))
    .catch((e: any) => next(e))
}