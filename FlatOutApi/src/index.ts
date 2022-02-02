import express from "express";
import mongoose from "mongoose";
import {config} from "dotenv";
import userRoutes from "./Api/UserApiCalls";
import groupRoutes from "./Api/GroupApiCalls"
import listRoutes from "./Api/ListApiCalls";
import utilRoutes from "./Api/_Utils";
import {addLogs} from "./Util/Logging";
import {errorHandler} from "./Util/ErrorHandling";
import helmet from "helmet";

/**
 * ENVIRONMENT VARIABLES
 * Using dotenv package, get the process.env values. Stored here is sensitive data which would be best not shown in a
 * public Git repository.
 */
config()
const port: string = process.env.PORT || "3200"
const mongoUri: string = process.env.MONGO_URI || '' // Will throw an error

/**
 * MONGODB:
 * Connect to the MongoDB interface. Set some variables such that deprecated fields are used/unused. MongoDB's
 * connections are slow, so doing it asynchronously first should help speed up the connection process.
 */
mongoose.connect(mongoUri).then(() => addLogs("MongoDB connected"))

/**
 * EXPRESS:
 * Instantiate the express interface. The order of instantiation is important here. Middleware declared before the API
 * Interfaces run BEFORE each HTTP request. Middleware declared after the API interface run AFTER each HTTP request.
 */
export const app = express()

// Middleware BEFORE requests
app.use(helmet())
app.use(express.json())

// Api Interfaces
app.use('/user', userRoutes)
app.use('/group', groupRoutes)
app.use('/list', listRoutes)
app.use('', utilRoutes)

// Middleware AFTER requests
app.use(errorHandler)

// Start listening once setup is complete
app.listen(port, () => {
    addLogs("Heroku connected");
    console.log(`http://localhost:${port}`)
})
