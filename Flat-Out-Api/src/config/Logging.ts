import {isDbConnected} from "./ConfigUtils";
import {LogLevel} from "../interfaces/_enums";
import {LogModel} from "../schemas/LogSchema";
import {Log} from "../interfaces/_utilInterfaces";

let localLogs: Log[] = []
const logging = false

const log = (message: string, object?: any, logLevel?: LogLevel) => {
  localLogs.push({
    level: logLevel ? logLevel : LogLevel.info,
    message,
    object,
  })

  if (isDbConnected() && logging) {
    localLogs.forEach(log => {new LogModel(log).save().then()})
    localLogs = []
  }
}

const info = (message: string, object?: any) =>
  log(message, object)

const warn = (message: string, object?: any) =>
  log(message, object, LogLevel.warn)

const error = (message: string, object?: any) =>
  log(message, object, LogLevel.error)

export default {
  info,
  warn,
  error,
};