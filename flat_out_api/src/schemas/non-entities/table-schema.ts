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
import {AssociationSchema, RequiredRepeatCycleSchema} from "../fom-db-objects";
import {EventSchema} from "./calendar-schema";
import {DbNonEntitySchema} from "./db-non-entity-schema";
import {getParent} from "../schema-utils";

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
  colIndex: {
    type: Number,
    required: true,
    validate: function (val: number) {
      let table = getParent<FomTable>(this)
      return 0 <= val && val < table.colLength
    }
  },
  cycle: RequiredRepeatCycleSchema,
}

/**
 * Schema definition for {@link FomTable}
 */
const TableSchema = new Schema<FomTable>({
  ...DbNonEntitySchema,
  colLength: {type: Number, required: true, min: 1, max: 6,},
  rowLength: {type: Number, required: true},
  fields: [String],
  records: [RecordSchema],
  rotations: [ColumnRotationConfigSchema],
}, {timestamps: true})

export const TableModel = model(ModelType.TABLE, TableSchema)