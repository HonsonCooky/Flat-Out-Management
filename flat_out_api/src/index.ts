import {startMongo} from "./config/StartMongo";
import {startApi} from "./config/StartApi";

require('./schemas/documents/UserSchema')
require('./schemas/documents/GroupSchema')
require('./schemas/documents/TableSchema')

startMongo()
startApi()