import {LogLevel} from "../interfaces/FomEnums";
import {ILog, LogModel} from "../schemas/util/LogSchema";
import {env} from "./Config";

let localLogs: ILog[] = []

const log = (message: string, object?: any, logLevel?: LogLevel) => {
  localLogs.push({
    level: logLevel ? logLevel : LogLevel.INFO,
    message,
    object,
  })

  if (!env.devMode && env.mongo.isDbConnected()) {
    localLogs.forEach(log => {
      (new LogModel(log)).save().then().catch()
    })
    localLogs = []
  }
}

const info = (message: string, object?: any) =>
  log(message, object)

const warn = (message: string, object?: any) =>
  log(message, object, LogLevel.WARN)

const error = (message: string, object?: any) =>
  log(message, object, LogLevel.ERROR)

const get = async () => {
  if (env.devMode) return localLogs
  else return (await LogModel.find({})).map((log: ILog) => {
    return {
      level: log.level,
      message: log.message,
      object: log.object
    }
  })
}

export const fomLogger = {
  info,
  warn,
  error,
  get
}