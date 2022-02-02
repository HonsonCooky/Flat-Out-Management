import mongoose from "mongoose";


export const isDbConnected = () => {
  return mongoose.connection.readyState === 1
}
