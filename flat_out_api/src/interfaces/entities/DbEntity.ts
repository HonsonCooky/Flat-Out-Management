import {DbObject} from "../DbObject";
import {Association} from "../Association";
import {ObjectId} from "mongoose";

/**
 * Ui Component is purely used to store data for the frontend. This object allows certain values to be consistent
 * across frontend applications on different devices.
 */
export interface UiComponent {
  /**The name to show all other users. Usernames have to be unique, however, you may want a nickname that isn't a login detail*/
  name: string,
  /**The color associated to this document*/
  color: string,
  /**The id of some image stored in the GridFS backend*/
  avatar?: ObjectId,
}

/**
 * Entities are things with distinct and independent existence. For our documents, we are focused more on the distinct
 * part. In that, each Entity will have a unique name (for that document type).
 *
 * Examples are {@link FomUser} and {@link FomGroup}. These documents act on data, making them entities.
 */
export interface DbEntity extends DbObject {
  /**The login 'username' for the entity*/
  name: string,
  /**The password which allows access to act for this entity*/
  password: string,
  /**The jwtUuid which allows access to act for this entity through JWT*/
  jwtUuid: ObjectId,
  /**The UI components of this entity*/
  ui: UiComponent,
  /**Tables that are associated to this entity*/
  tables: Association[],
  /**A Calendar that is associated to this entity*/
  calendar?: Association,
}