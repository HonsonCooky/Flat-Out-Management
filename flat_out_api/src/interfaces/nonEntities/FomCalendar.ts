import {DbNonEntity} from "./DbNonEntity";

/**
 * A contract for Events in a Calendar.
 */
export interface Event {
  /**When the event starts from*/
  from: Date,
  /**When then event goes to*/
  to: Date,
  /**The name of the event*/
  title: string,
  /**A message to attach to this event*/
  message?: string,
  /**Number of milliseconds before the event starts, to notify users
   * Note: Server constraints means this is just information for the frontend to handle
   */
  notifyTimeBeforeMs?: number
}

/**
 * A contract for Calendar documents on the MongoDB.
 * Calendars are essentially glorified lists of events. They differ from {@link FomTable}s, in that, they hold one
 * specific type of item.
 */
export interface FomCalendar extends DbNonEntity {
  events: Event[],
}