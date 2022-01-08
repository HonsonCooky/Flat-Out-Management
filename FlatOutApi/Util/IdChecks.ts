import {Model} from "mongoose";

export async function checkIds(model: Model<any>, ...ids: any[]) {
  for (let i = 0; i < ids.length; i++) {
    let id: any = ids[i]
    let count = 0
    try {
      count = await model.countDocuments({_id: id})
    } catch (e) {
      throw new Error(`400: Provided unknown id ${ids[i]}`)
    }
    if (count === 0) throw new Error(`400: Provided unknown id ${ids[i]}`)
  }
}