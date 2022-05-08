import {IFomAssociation} from "./IFomAssociation";
import {IFomDbObject} from "./IFomDbObject";

/**
 * Outlines a document, which maintains information for the db.
 */
export interface IFomComponent extends IFomDbObject {
  parents: IFomAssociation[],
}