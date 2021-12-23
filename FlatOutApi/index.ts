import express from "express";
import mongoose, {MongooseOptions} from "mongoose";
import {config} from "dotenv";
import {initializeUserInterface} from "./Interface/UserInterface";
import {initializeUtilInterface} from "./Interface/InterfaceUtils";
import {initializeGroupInterface} from "./Interface/GroupInterface";
import {initializeListInterface} from "./Interface/ListInterface";
import {addLogs} from "./Util/Logging";
import {errorHandler} from "./Util/ErrorHandling";

/**
 * ENVIRONMENT VARIABLES
 * Using dotenv package, get the process.env values. Stored here is sensitive data which would be best not shown in a
 * public Git repository.
 */
config()
export const secret = process.env.TOKEN_SECRET
const port = process.env.PORT || "3200"
const mongoUri = process.env.MONGO_URI
const mongoOptions: MongooseOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

if (!secret || !port || !mongoUri) throw new Error(`Something went wrong. Secret: ${!!secret}. Port: ${!!port}. Uri: ${!!mongoUri}`)

/**
 * MONGODB:
 * Connect to the MongoDB interface. Set some variables such that deprecated fields are used/unused. MongoDB
 * connections are slow, so doing it asynchronously first should help speed up the connection process.
 */
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(mongoUri, mongoOptions).then(() => addLogs("MongoDB connected"))

/**
 * EXPRESS:
 * Instantiate the express interface. The order of instantiation is important here. Middleware declared before the API
 * interfaces run BEFORE each HTTP request. Middleware declared after the API interface run AFTER each HTTP request.
 */
export const app = express()

// Middleware BEFORE requests
app.use(express.json())

// Initialize interfaces, grouped by interactions with MongoDB collections
initializeUserInterface()
initializeGroupInterface()
initializeListInterface()
initializeUtilInterface()

// Middleware AFTER requests
app.use(errorHandler)

// Start listening once setup is complete
app.listen(port, () => {
    addLogs("Heroku connected");
    console.log(`http://localhost:${port}`)
})
