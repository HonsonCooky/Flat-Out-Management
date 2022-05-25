import {DbNonEntity} from "./db-non-entity";

/**
 * A contract for Events in a Calendar.
 * Events are storage objects which outline all the details needed for some calendar event.
 */
export interface Event {
  /**When the event starts from*/
  from: Date,
  /**When then event goes to*/
  to: Date,
  /**The name of the event. Doubles as the notification title*/
  title: string,
  /**A message to attach to this event. Doubles as the message for a notification*/
  message?: string,
  /**Number of milliseconds before the event starts, to notify users
   * Note: Server constraints means this is just information for the frontend to handle*/
  notifyTimeBeforeMs?: number
}

/**
 * A contract for Calendar documents on the MongoDB.
 * Calendars are essentially glorified lists of events. They differ from {@link FomTable}s, in that, they hold one
 * specific type of item ({@link Event}).
 */
export interface FomCalendar extends DbNonEntity {
  events: Event[],
}