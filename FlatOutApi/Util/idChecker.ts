import {Model} from "mongoose";

export async function checkIds(model: Model<any>, ...ids: string[]) {
  for (const id of ids){
    if (!await model.exists({_id: id})) throw new Error(`400: Unknown id ${id}`)
  }
}
