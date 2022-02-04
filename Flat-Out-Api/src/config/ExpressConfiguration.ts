import express from "express";
import helmet from "helmet";
import userRoutes from "../routes/UserRoutes";
import groupRoutes from "../routes/GroupRoutes";
import listRoutes from "../routes/ListRoutes";
import configRoutes from "../routes/ConfigRoutes";
import {errorHandler} from "../middleware/ErrorHandling";

const webAPI = express()

// middleware BEFORE requests
webAPI.use(helmet())
webAPI.use(express.json())

// Initialize Routes
webAPI.use('/user', userRoutes)
webAPI.use('/group', groupRoutes)
webAPI.use('/list', listRoutes)
webAPI.use('', configRoutes)

// middleware AFTER requests
webAPI.use(errorHandler)

export = webAPI