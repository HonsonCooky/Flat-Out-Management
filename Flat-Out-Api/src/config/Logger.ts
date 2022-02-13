import {LogLevel} from "../interfaces/GlobalEnums";
import {ILog, LogModel} from "../schemas/LogSchema";
import env from "./EnvConfig";

let localLogs: ILog[] = []

const log = (message: string, object?: any, logLevel?: LogLevel) => {
  if (env.devMode) return

  if (env.mongo.isDbConnected()) {
    localLogs.forEach(log => {
      (new LogModel(log)).save().then()
    })
    localLogs = []
  } else {
    localLogs.push({
      level: logLevel ? logLevel : LogLevel.INFO,
      message,
      object,
    })
  }
}

const info = (message: string, object?: any) =>
  log(message, object)

const warn = (message: string, object?: any) =>
  log(message, object, LogLevel.WARN)

const error = (message: string, object?: any) =>
  log(message, object, LogLevel.ERROR)


export default {
  info,
  warn,
  error,
}