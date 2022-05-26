import {model, Schema, SchemaDefinitionProperty} from "mongoose";
import {
  CalculationCell,
  ColumnRotationConfig,
  ComplexCell,
  FomTable,
  LinkCell,
  Record
} from "../../interfaces/non-entities/fom-table";
import {ModelType} from "../../interfaces/association";
import {AssociationSchema, RepeatCycleSchema} from "../fom-db-objects";
import {EventSchema} from "./calendar-schema";

/**
 * Schema definition for {@link CalculationCell}
 */
const CalculationCellSchema: SchemaDefinitionProperty<CalculationCell> = {
  codeStr: {type: String, required: true},
  value: {type: String, required: true}
}

/**
 * Schema definition for {@link LinkCell}
 */
const LinkCellSchema: SchemaDefinitionProperty<LinkCell> = {
  link: {type: String, required: true},
  value: {type: String, required: true},
}

/**
 * Schema definition for {@link ComplexCell}
 */
const ComplexCellSchema: SchemaDefinitionProperty<ComplexCell> = {
  data: AssociationSchema || EventSchema || CalculationCellSchema || LinkCellSchema
}

/**
 * Schema definition for {@link Record}
 */
const RecordSchema: SchemaDefinitionProperty<Record> = {
  type: String || Number || Date || ComplexCellSchema
}

/**
 * Schema definition for {@link ColumnRotationConfig}
 */
const ColumnRotationConfigSchema: SchemaDefinitionProperty<ColumnRotationConfig> = {
  colNum: {type: Number, required: true},
  cycle: RepeatCycleSchema
}

/**
 * Translates the FomTable interface into a mongoose.Schema.
 * Tables are utilized to
 */
const TableSchema = new Schema<FomTable>({
  //TODO
}, {timestamps: true})

export const TableModel = model(ModelType.TABLE, TableSchema)