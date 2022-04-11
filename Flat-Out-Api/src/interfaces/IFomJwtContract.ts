import {JwtPayload} from "jsonwebtoken";
import {Types} from "mongoose";

/**
 * JWT CONTRACT: A jwt token can be extracted to this contract. It must also be signed using this contract.
 */
export interface IFomJwtContract extends JwtPayload {
  dynUuid?: Types.ObjectId
}
