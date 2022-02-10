import {connect} from "mongoose";
import env from "./_envConfig";
import _logger from "./_logger";
import {UserModel} from "../schemas/UserSchema";
import {GroupModel} from "../schemas/GroupSchema";
import {TableModel} from "../schemas/TableSchema";
import {LogModel} from "../schemas/LogSchema";

export function _startMongo() {
  connect(env.mongo.connectionStr)
    .then(() => _logger.info("MongoDB connected"))
    .catch(e => _logger.error(`MongoDB connection failed: ${e.message}`))

  // Reference to force model creations
  _logger.info(`MODELS: ${UserModel.name}, ${GroupModel.name}, ${TableModel.name}, ${LogModel.name}`)
}