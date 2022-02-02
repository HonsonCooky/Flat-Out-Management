import express from "express";
import mongoose from "mongoose";
import {config} from "dotenv";
import userRoutes from "./routes/UserRoutes";
import groupRoutes from "./routes/GroupRoutes"
import listRoutes from "./routes/ListRoutes";
import configRoutes from "./routes/ConfigRoutes";
import {log} from "./config/Logging";
import {errorHandler} from "./middleware/ErrorHandling";
import helmet from "helmet";

/**
 * ENVIRONMENT VARIABLES
 * Using dotenv package, get the process.env values. Stored here is sensitive data which would be best not shown in a
 * public Git repository.
 */
config()

if (
  !process.env.DATABASE_ACCESS ||
  !process.env.SERVER_PORT ||
  !process.env.SERVER_TOKEN_EXPIRATION ||
  !process.env.SERVER_TOKEN_ISSUER ||
  !process.env.SERVER_TOKEN_SECRET
)
  throw new Error('500: Missing environment variables')

const DATABASE_ACCESS: string = process.env.DATABASE_ACCESS
const SERVER_PORT: string = process.env.SERVER_PORT
const SERVER_TOKEN_EXPIRATION: string = process.env.SERVER_TOKEN_EXPIRATION
const SERVER_TOKEN_ISSUER: string = process.env.SERVER_TOKEN_ISSUER
const SERVER_TOKEN_SECRET: string = process.env.SERVER_TOKEN_SECRET

/**
 * MONGODB:
 * Connect to the MongoDB interface. Set some variables such that deprecated fields are used/unused. MongoDB's
 * connections are slow, so doing it asynchronously first should help speed up the connection process.
 */
mongoose.connect(DATABASE_ACCESS).then(() => log("MongoDB connected"))

/**
 * EXPRESS:
 * Instantiate the express interface. The order of instantiation is important here. middleware declared before the API
 * interfaces run BEFORE each HTTP request. middleware declared after the API interface run AFTER each HTTP request.
 */
export const app = express()

// middleware BEFORE requests
app.use(helmet())
app.use(express.json())

// Initialize Routes
app.use('/user', userRoutes)
app.use('/group', groupRoutes)
app.use('/list', listRoutes)
app.use('', configRoutes)

// middleware AFTER requests
app.use(errorHandler)

// Start listening once setup is complete
app.listen(SERVER_PORT, () => {
  log("Heroku connected");
  console.log(`http://localhost:${SERVER_PORT}`)
})
