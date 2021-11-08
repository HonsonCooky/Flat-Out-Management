import express, {json} from "express";
import mongoose, {MongooseOptions} from "mongoose";
import {config} from "dotenv";
import {initializeUserInterface} from "./Interface/UserInterface";
import {initializeUtilInterface} from "./Interface/UtilInterface";


export const app = express()
export const jsonHandler = json()
config()
const port: string = process.env.PORT || "3200"
const mongoUri: string = process.env.MONGO_URI || ''
const mongoOptions: MongooseOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

let sessionLogs: string[] = []
export const getLogs = () => { return [...sessionLogs] }
export const addLogs = (...logs: string[]) => {sessionLogs = sessionLogs.concat(logs)}
export const isDbConnected = () => { return mongoose.connection.readyState === 1}

// Connect to MONGO
mongoose.connect(mongoUri, mongoOptions).then(() => addLogs("MongoDB connected"))

// Initialize the interface and start HEROKU instance
initializeUtilInterface()
initializeUserInterface()
app.listen(port, () => { addLogs("Heroku connected"); console.log(`http://localhost:${port}`)})