import {startMongo} from "./config/StartMongo";
import {startApi} from "./config/StartApi";

startMongo()
startApi()


let d = new Date()
d.setUTCFullYear(2020, 2, 20)
d.setUTCHours(0, 0, 0, 0)