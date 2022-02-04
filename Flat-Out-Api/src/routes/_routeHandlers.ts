import {IRes} from "../interfaces/_fomObjects";

export function handleApiCall(promise: Promise<IRes>, req: any, res: any, next: any) {
  promise
    .then((fomRes: IRes) => res.status(200).send(fomRes))
    .catch((e: any) => next(e))
}