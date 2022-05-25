import {DbNonEntity} from "./db-non-entity";
import {RepeatCycle} from "./repeat";

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
  /**Defines a {@link RepeatCycle}, that allows this event to be repeated*/
  cycle: RepeatCycle
}

/**
 * A contract for Calendar documents on the MongoDB.
 * Calendars are essentially glorified lists of events. They differ from {@link FomTable}s, in that, they only hold
 * events. Although {@link Event}s can also be placed into tables, calendars guarantee that all items are events.
 */
export interface FomCalendar extends DbNonEntity {
  /**The list of events, which make up the calendar*/
  events: Event[],
}