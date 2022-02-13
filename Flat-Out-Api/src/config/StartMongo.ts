import {connect} from "mongoose";
import env from "./EnvConfig";
import _logger from "./Logger";
import {UserModel} from "../schemas/UserSchema";
import {GroupModel} from "../schemas/GroupSchema";
import {TableModel} from "../schemas/TableSchema";
import {LogModel} from "../schemas/LogSchema";

export function startMongo() {
  connect(env.mongo.connectionStr)
    .then(() => _logger.info("MongoDB connected"))
    .catch(e => _logger.error(`MongoDB connection failed: ${e.message}`))

  // Reference to force model creations
  _logger.info(`MODELS: ${UserModel.name}, ${GroupModel.name}, ${TableModel.name}, ${LogModel.name}`)
}