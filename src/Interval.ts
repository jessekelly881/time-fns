import * as D from "./Duration";
import { addDuration, subDuration } from "./Date";


// Represents a time interval w/ a start `Date` and a `Duration`.
export interface Interval {
    readonly _tag: "Interval";
    readonly start: Date;
    readonly duration: D.Duration;

    readonly end: Date; // Computed prop. For performance and DX.
}

class IntervalImpl implements Interval {
    readonly _tag = "Interval";
    readonly end;

    constructor(readonly start: Date, readonly duration: D.Duration) {
      this.end = new Date(this.start.getTime() + this.duration.ms)
    }
}

// union :: Interval -> Interval -> Interval
// intersect :: Interval -> Interval -> Interval

/**
 * Constructs an Interval from a given start `Date` an a `Duration`.
 */
export const make =
  (start: Date, duration: D.Duration) =>
    new IntervalImpl(start, duration);

/**
 * Shifts the start time of an `Interval` forward by some `Duration`.
 */
export const shiftForward = (duration: D.Duration) => (interval: Interval) =>
  new IntervalImpl(
    addDuration(duration)(interval.start),
    interval.duration
  );

/**
 * Shifts the start time of an `Interval` back by some `Duration`.
 */
export const shiftBack = (duration: D.Duration) => (interval: Interval) =>
  new IntervalImpl(
    subDuration(duration)(interval.start),
    interval.duration
  );

/**
 * Subdivides an Interval into chunks of a given Duration. 
 */
const subdivide = (duration: D.Duration) => (interval: Interval): Interval[] => []

export const containsDate = (i: Interval) => (d: Date) =>
  d.getTime() >= i.start.getTime() && d.getTime() <= i.end.getTime(); 


/**
 * Extends the duration of an interval
 */
export const extendBy = (d: D.Duration) => (i: Interval) =>
  new IntervalImpl(i.start, D.add(d)(i.duration));