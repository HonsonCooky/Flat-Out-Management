import {connect, models} from "mongoose";
import {env} from "./Config";
import {fomLogger} from "./Logger";
import {UserModel} from "../schemas/documents/UserSchema";
import {GroupModel} from "../schemas/documents/GroupSchema";
import {TableModel} from "../schemas/documents/TableSchema";
import {LogModel} from "../schemas/util/LogSchema";
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

  fomLogger.info(`MODELS: ` +
    `${UserModel.collection.name}, ` +
    `${GroupModel.collection.name}, ` +
    `${TableModel.collection.name}, ` +
    `${LogModel.collection.name}`)
}

/**
 * CLEAN DOCUMENTS: Delete any documents that have no associations AND were last updated one week ago
 */
async function cleanDocuments(type: ModelType) {
  fomLogger.info(`Cleaning ${type} documents`)
  let docs: IFomComponent[] = await models[type]?.find({})
  if (!docs) return

  let today = new Date()

  for (let doc of docs)
    if (doc.children.length === 0)
      if ((today.getTime() - new Date(doc.updatedAt).getTime()) > (1000 * 60 * 60 * 24 * 7))
        await doc.deleteOne()

  fomLogger.info(`${type} documents cleaned`)
}