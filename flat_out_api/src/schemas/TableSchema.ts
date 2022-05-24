import {model, Schema} from "mongoose";
import {FomTable} from "../interfaces/nonEntities/FomTable";
import {ModelType} from "../interfaces/Association";


/**
 * Translates the FomTable interface into a mongoose.Schema.
 * Tables are utilized to
 */
const TableSchema = new Schema<FomTable>({
  //TODO
}, {timestamps: true})

export const TableModel = model(ModelType.TABLE, TableSchema)