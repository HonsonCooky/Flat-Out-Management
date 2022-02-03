/** ---------------------------------------------------------------------------------------------------------------
 * LOG SCHEMA:
 * The Log Schema outlines logs to be stored in MongoDB.
 --------------------------------------------------------------------------------------------------------------- */
import {model, Schema} from "mongoose";
import {LogLevel} from "../interfaces/_enums";
import {Log} from "../interfaces/_utilInterfaces";

const LogSchema = new Schema<Log>({
  level: {type: String, enum: LogLevel, default: LogLevel.info},
  message: {type: String, required: [true, "Log missing message?"]},
  object: {type: String}
}, {timestamps: true})

export const LogModel = model<Log>("Logs", LogSchema)