import express from "express";
import {routeHandler} from "../middleware/RouteHandler";
import {userAuth, userConnect, userDelete, userGet, userRegister, userUpdate} from "../management/UserManagement";

const userRoutes = express.Router()

userRoutes.post('/register', routeHandler(userRegister))
userRoutes.post('/authenticate', routeHandler(userAuth))
userRoutes.post('/delete', routeHandler(userDelete))
userRoutes.post('/update', routeHandler(userUpdate))
userRoutes.post('/connect-:ctrlType-to-:compType', routeHandler(userConnect))
userRoutes.get('', routeHandler(userGet))

export = userRoutes