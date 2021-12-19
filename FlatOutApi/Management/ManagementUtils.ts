import {Model} from "mongoose";

export const validateModel = (obj: any, model: Model<any>) => {
  let errMsg: any;
  if ((errMsg = new model(obj).validateSync())) throw new Error(`400:${errMsg.message}`)
}