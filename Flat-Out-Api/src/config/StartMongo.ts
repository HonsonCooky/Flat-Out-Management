import {connect, models} from "mongoose";
import env from "./EnvConfig";
import _logger from "./Logger";
import {UserModel} from "../schemas/UserSchema";
import {GroupModel} from "../schemas/GroupSchema";
import {TableModel} from "../schemas/TableSchema";
import {LogModel} from "../schemas/LogSchema";
import {ModelEnum} from "../interfaces/GlobalEnums";
import {IFomObject} from "../interfaces/FomObjects";

export function startMongo() {
  connect(env.mongo.connectionStr)
    .then(() => {
      _logger.info("MongoDB connected")
      cleanDocuments(ModelEnum.GROUP).catch()
      cleanDocuments(ModelEnum.TABLE).catch()
    })
    .catch(e => _logger.error(`MongoDB connection failed: ${e.message}`))

  // Reference to force model creations
  _logger.info(`MODELS: ${UserModel.name}, ${GroupModel.name}, ${TableModel.name}, ${LogModel.name}`)
}

/**
 * CLEAN DOCUMENTS: Delete any documents that have no associations AND were last updated one week ago
 */
async function cleanDocuments(type: ModelEnum) {
  let docs: IFomObject[] = await models[type].find({})
  let today = new Date()

  for (let doc of docs) {
    if (doc.associations.length === 0)
      if ((today.getTime() - new Date(doc.updatedAt).getTime()) > (1000 * 60 * 60 * 24 * 7)) {
        doc.deleteOne()
      }
  }
}