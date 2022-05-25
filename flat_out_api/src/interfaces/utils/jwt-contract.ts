import {JwtPayload} from "jsonwebtoken";
import {ObjectId} from "mongoose";

/**
 * A jwt token can be extracted to this contract. It must also be signed using this contract.
 */
export interface JwtContract extends JwtPayload {
  jwtUuid: ObjectId
}
