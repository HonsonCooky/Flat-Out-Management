import {IReq, IRes} from "../interfaces/_fomObjects";

export function handlePostCall(fn: (params: string[], body: IReq) => Promise<IRes>, req: any, res: any, next: any) {
  fn(req.params, req.body)
    .then((fomRes: IRes) => res.status(200).send(fomRes))
    .catch((e: any) => next(e))
}