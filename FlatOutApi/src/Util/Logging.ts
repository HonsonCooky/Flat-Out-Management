import mongoose from "mongoose";

/** -----------------------------------------------------------------------------------------------------------------
 * LOGS:
 * Logs are used to maintain some information about the current session. Holding this information can provide some
 * insight into the state of the running instance. For example, if the MongoDB connection is ready, or if certain
 * errors exist. Naturally, this information is only held on the server whist it runs. For this use case, a 30 min
 * timeout should erase all information without a stack overflow. Granted, this is used lightly.
 ----------------------------------------------------------------------------------------------------------------- */
let sessionLogs: string[] = []
export const getLogs = () => {
  return [...sessionLogs]
}
export const addLogs = (...logs: string[]) => {
  sessionLogs = sessionLogs.concat(logs)
}
export const isDbConnected = () => {
  return mongoose.connection.readyState === 1
}
