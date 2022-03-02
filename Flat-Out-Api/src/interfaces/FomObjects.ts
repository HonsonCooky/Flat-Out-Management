import {Types} from "mongoose";
import {JwtPayload} from "jsonwebtoken"


/**
 * FOM OBJECT: A generic object which can be either a FOMNode or FOMProtectedNode
 */
export type IFomObject = IFomController | IFomComponent;


/**
 * FOM CONTROLLER: A controller is a document that maintains a client's information. It enables authentication and
 * verification of actions.
 */
export interface IFomController extends IFomComponent {
  uuid: Types.ObjectId // Hidden
}

/**
 * JWT CONTRACT: A jwt token can be extracted to this contract. It must also be signed using this contract.
 */
export interface JwtAuthContract extends JwtPayload {
  uuid: any
}

/**
 * IRES: Flat Out management Result, outlines the contract that the API will adhere to, sending anything back to
 * the client.
 */
export type IRes = {
  msg: string,
  item?: IFomObject,
  token?: string
}
