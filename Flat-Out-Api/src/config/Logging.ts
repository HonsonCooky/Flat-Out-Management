import {isDbConnected} from "./ConfigUtils";
import {LogLevel} from "../interfaces/_enums";
import {ILog, LogModel} from "../schemas/LogSchema";

let localLogs: ILog[] = []
const logging = false

const log = (message: string, object?: any, logLevel?: LogLevel) => {
  if (!logging) return

  localLogs.push({
    level: logLevel ? logLevel : LogLevel.info,
    message,
    object,
  })

  if (isDbConnected()) {
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


const logger = {
  info,
  warn,
  error,
}

export = logger