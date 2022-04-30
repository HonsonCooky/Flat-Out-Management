import {model, Schema} from "mongoose";
import {LogLevel} from "../../interfaces/IFomEnums";

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
  level: {type: Number, enum: LogLevel, default: LogLevel.INFO},
  message: {type: String, required: true},
  object: {typeRegExp: String}
}, {timestamps: true, capped: {size: 100}})

export const LogModel = model<ILog>("_logs", LogSchema)