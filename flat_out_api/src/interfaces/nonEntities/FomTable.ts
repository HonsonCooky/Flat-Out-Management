import {Association} from "../Association";
import {DbNonEntity} from "./DbNonEntity";

export type CellCalculation = {
  codeStr: string
}

/**
 * Outlines the different data values allowed in a table cell.
 */
export type TableRecord = (string | number | Date | Association | CellCalculation)[]


/**
 * Outlines the necessary settings for a table rotation configuration
 */
export interface TableRotationConfig {
  colNum: number,
  updateDate: Date,
}

/**
 * A contract for Table documents on the MongoDB.
 * Tables are used like a list. They maintain information that can be "connected". Why we use a table, is for the
 * automation of column rotation. Say you have some custom table called "chores". One column details all the chores,
 * whilst another details each of the users.
 */
export interface FomTable extends DbNonEntity {
  colLength: number,
  rowLength: number,
  fields: TableRecord
  records: TableRecord[],
  rotations: TableRotationConfig[],
  associations: Association[],
}
