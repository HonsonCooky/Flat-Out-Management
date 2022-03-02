import {JwtPayload} from "jsonwebtoken"

/**
 * FOM JWT CONTRACT: A jwt token can be extracted to this contract. It must also be signed using this contract.
 */
export interface IFomJwtContract extends JwtPayload {
  val: any
}
