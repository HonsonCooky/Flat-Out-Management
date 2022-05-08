import {connect, models} from "mongoose";
import {env} from "./Config";
import {fomLogger} from "./Logger";
import {ModelType} from "../interfaces/IFomEnums";
import {IFomComponent} from "../interfaces/IFomComponent";

export function startMongo() {
  connect(env.mongo.connectionStr)
    .then(() => {
      fomLogger.info("MongoDB connected")
      Object.values(ModelType).forEach((val: ModelType) => cleanDocuments(val).catch((_) => {
      }))
    })
    .catch(e => fomLogger.error(`MongoDB connection failed: ${e.message}`))
}

/**
 * Delete any documents that have no associations AND were last updated 26 weeks ago
 */
async function cleanDocuments(type: ModelType) {
  fomLogger.info(`Cleaning ${type} documents`)
  let docs: IFomComponent[] = await models[type]?.find({})
  if (!docs) return

  let today = new Date()

  for (let doc of docs)
    if (doc.children.length === 0)
      if ((today.getTime() - new Date(doc.updatedAt).getTime()) > (1000 * 60 * 60 * 24 * 7 * 26))
        await doc.deleteOne()

  fomLogger.info(`${type} documents cleaned`)
}