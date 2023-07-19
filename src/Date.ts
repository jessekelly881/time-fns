// Date helper fns

import { Duration } from "./Duration";

/**
 * Moves a Date forward by some duration
 */
export const addDuration = (duration: Duration) => (date: Date) =>
  new Date(date.getTime() + duration.ms);

/**
 * Moves a Date back by some duration
 */
export const subDuration = (duration: Duration) => (date: Date) =>
  new Date(date.getTime() - duration.ms);