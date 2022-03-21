import {model, Schema} from "mongoose";
import {LogLevel} from "../../interfaces/FomEnums";

/** ---------------------------------------------------------------------------------------------------------------
 * LOG SCHEMA:
 * The Log Schema outlines logs to be stored in MongoDB.
 --------------------------------------------------------------------------------------------------------------- */
export interface ILog {
  level: LogLevel,
  message: string,
  object: any
}

const LogSchema = new Schema<ILog>({
  level: {type: String, enum: LogLevel, default: LogLevel.INFO},
  message: {type: String, required: [true, "Log missing message?"]},
  object: {typeRegExp: String}
}, {timestamps: true})

export const LogModel = model<ILog>("_logs", LogSchema)