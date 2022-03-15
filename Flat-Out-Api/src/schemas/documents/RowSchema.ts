import {Schema} from "mongoose";
import {FOM_ROW} from "../util/FomSchemaDefinitionProperties";
import {IFomAssociation} from "../../interfaces/IFomAssociation";


/** ------------------------------------------------------------------------------------------------------------------
 * ROW SCHEMA: Tables should be an SQL thing, but this is the best way of storing dynamic list data. The row contains
 * information for each item in a list, where list items have an unknown number of parameters.
 ------------------------------------------------------------------------------------------------------------------*/
export interface IRow {
  cells: (string | IFomAssociation | Date)[]
}

export const RowSchema = new Schema<IRow>({
  cells: FOM_ROW
})
