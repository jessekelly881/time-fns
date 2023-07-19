import { Duration, ms } from "./Duration";


// Represents a time interval w/ a start and end `Date`.
export interface Interval {
    _tag: "Interval";
    start: Date;
    end: Date;
}

class IntervalImpl {
    readonly _tag = "Interval";
    constructor(readonly start: Date, readonly end: Date) {}
}

// union :: Interval -> Interval -> Interval
// intersect :: Interval -> Interval -> Interval

export const make = (start: Date, end: Date): Interval =>
  new IntervalImpl(start, end);

export const getDuration = (i: Interval): Duration =>
  ms(Math.max(0, i.end.getTime() - i.start.getTime()));

export const contains = (i: Interval) => (date: Date) => true;