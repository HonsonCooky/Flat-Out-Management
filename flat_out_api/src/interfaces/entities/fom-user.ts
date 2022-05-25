import {Association} from "../association";
import {DbEntity} from "./db-entity";

/**
 * A contract for User documents on the MongoDB.
 * Users are completely individual documents that represent a real person on the frontend. Users can be associated to
 * many groups.
 */
export interface FomUser extends DbEntity {
  /**Groups that this user associates with*/
  groups: Association[],
  /**A boolean which, if true, indicates that some connected document has been updated*/
  shouldUpdate: boolean,
}