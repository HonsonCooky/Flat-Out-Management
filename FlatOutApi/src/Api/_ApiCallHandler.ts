import {FOMReq, FOMRes} from "../Interfaces/_Enums";

export function handlePostCall(fn: (body: FOMReq) => Promise<FOMRes>, req: any, res: any, next: any) {
  fn(req.body)
    .then((fomRes: FOMRes) => res.status(200).send(fomRes))
    .catch((e: any) => next(e))
}