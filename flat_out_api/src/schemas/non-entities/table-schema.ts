import {model, Schema} from "mongoose";
import {FomTable} from "../../interfaces/non-entities/fom-table";
import {ModelType} from "../../interfaces/association";


/**
 * Translates the FomTable interface into a mongoose.Schema.
 * Tables are utilized to
 */
const TableSchema = new Schema<FomTable>({
  //TODO
}, {timestamps: true})

export const TableModel = model(ModelType.TABLE, TableSchema)