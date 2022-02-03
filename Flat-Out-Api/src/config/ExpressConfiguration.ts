import express from "express";
import helmet from "helmet";
import userRoutes from "../routes/UserRoutes";
import groupRoutes from "../routes/GroupRoutes";
import listRoutes from "../routes/ListRoutes";
import configRoutes from "../routes/ConfigRoutes";
import {errorHandler} from "../middleware/ErrorHandling";

const app = express()

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

export = app