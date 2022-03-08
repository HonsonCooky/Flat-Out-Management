import {Schema} from "mongoose";
import {FOM_ASSOCIATION} from "../util/FomSchemaDefinitionProperties";
import {IFomAssociation} from "../../interfaces/IFomAssociation";


/** ------------------------------------------------------------------------------------------------------------------
 * ROW SCHEMA: Tables should be an SQL thing, but this is the best way of storing dynamic list data. The row contains
 * information for each item in a list, where list items have an unknown number of parameters.
 ------------------------------------------------------------------------------------------------------------------*/
export interface IRow {
  cells: string | IFomAssociation | Date []
}

export const RowSchema = new Schema<IRow>({
  cells: [{type: String || FOM_ASSOCIATION || Date}]
})
