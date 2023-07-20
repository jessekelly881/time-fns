// Date helper fns

import { Duration } from "./Duration";


export type TimeUnit = "ms" | "s" | "m" | "h"

/**
 * Moves a Date forward by some Duration
 */
export const addDuration = (...durations: Duration[]) => (date: Date) => {
  const sumMs = durations.reduce((sum, d) => sum + d.ms, 0)
  return new Date(date.getTime() + sumMs);
}

/**
 * Moves a Date back by some Duration
 */
export const subDuration = (duration: Duration) => (date: Date) =>
  new Date(date.getTime() - duration.ms);

export const isAfter =
  (that: Date) =>
  (self: Date): boolean =>
    self.getTime() > that.getTime();

export const isAfterOrEqual =
  (that: Date) =>
  (self: Date): boolean =>
    self.getTime() >= that.getTime();

export const isBefore =
  (that: Date) =>
  (self: Date): boolean =>
    self.getTime() < that.getTime();

export const isBeforeOrEqual =
  (that: Date) =>
  (self: Date): boolean =>
    self.getTime() <= that.getTime();

// Round down (floor) to nearest s, m, h, ...
export const floorTo = (unit: TimeUnit) => (date: Date): Date => {
  const newDate = new Date(date);

  switch(unit) {
    case "s":
      newDate.setSeconds(newDate.getSeconds(), 0)
      break;

    case "m":
      newDate.setMinutes(newDate.getMinutes(), 0, 0)
      break;
    
    case "h":
      newDate.setHours(newDate.getHours(), 0, 0, 0)
      break;

    case "ms":
    default: 
      return newDate;
  }

  return newDate;
} 