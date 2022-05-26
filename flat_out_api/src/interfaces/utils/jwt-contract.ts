import {JwtPayload} from "jsonwebtoken";
import {Types} from "mongoose";

/**
 * A jwt token can be extracted to this contract. It must also be signed using this contract.
 */
export interface JwtContract extends JwtPayload {
  /**db-entity's will contain a jwtUuid identifier. This is the value which is decoded from the JWT*/
  jwtUuid: Types.ObjectId
}
