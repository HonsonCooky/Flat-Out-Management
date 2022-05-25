import {Association} from "../association";
import {DbNonEntity} from "./db-non-entity";
import {Event} from "./fom-calendar";
import {RepeatCycle} from "./repeat";

/**
 * Calculation cells are used to automate table cell values. These cells are stored for frontend utilization ONLY.
 * The code is not executed on the backend (else we create a dependency to compute information on the backend).
 */
export type CalculationCell = {
  /**Some custom code string, that will be set-by, and evaluated by, the frontend*/
  codeStr: string
  /**The last known value for this cell. If there is no value, the cell has not been executed yet*/
  value: string,
}

/**
 * Link cells are string-url key-pair tuple objects.
 */
export type LinkCell = {
  /**The url link associated with the {@link value}*/
  link: string
  /**The user visible string value*/
  value: string,
}

/**
 * Complex cells allow for more complicated data to be stored in a table.
 * Note, each one of these objects has a 'value' field. This 'value' field represents the frontend representation of
 * the object. The extra information stored in the object is for identifying the type of complex data, and for it's
 * implementation.
 */
export type ComplexCell = {
  /**The complex object to be stored in a cell*/
  data: Association | Event | CalculationCell | LinkCell
}

/**
 * Outlines the different data values allowed in a table cell.
 * - String, Number and Date are all native data values.
 * - See {@link ComplexCell}s, for understanding of more complex data types.
 */
export type TableRecord = (string | number | Date | ComplexCell)[]


/**
 *
 */
export interface TableRotationConfig {
  colNum: number,
  updateDate: Date,
  cycle: RepeatCycle
}

/**
 * A contract for Table documents on the MongoDB.
 * Tables are used like a list. They maintain information that can be "connected". Why we use a table, is for the
 * automation of column rotation. Say you have some custom table called "chores". One column details all the chores,
 * whilst another details each of the users. Each week, the "chores" column gets rotated (to represent who is on
 * what chore).
 */
export interface FomTable extends DbNonEntity {
  colLength: number,
  rowLength: number,
  fields: TableRecord
  records: TableRecord[],
  rotations: TableRotationConfig[],
}
