import * as D from "./Duration";
import { addDuration, subDuration, TimeUnit, floorTo } from "./Date";


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
  (start: Date, duration: D.Duration): Interval =>
    new IntervalImpl(start, duration);

/**
 * Shifts the `Interval` forward by some `Duration`.
 */
export const shiftForward =
  (duration: D.Duration) =>
  (interval: Interval): Interval =>
    new IntervalImpl(addDuration(duration)(interval.start), interval.duration);

/**
 * Shifts `Interval` back by some `Duration`.
 */
export const shiftBack =
  (duration: D.Duration) =>
  (interval: Interval): Interval =>
    new IntervalImpl(subDuration(duration)(interval.start), interval.duration);

/**
 * Shifts start time to back (floor) the nearest second, minute, hour, etc. 
 */
export const shiftBackToNearest = (unit: TimeUnit) => (i: Interval): Interval => 
  new IntervalImpl(floorTo(unit)(i.start), i.duration)

/**
 * Partitions a single Interval into n Intervals of equal size
 */
export const partition = (count: number) => (interval: Interval): Interval[] => {
  let ret: Interval[] = []
  let start: Date = interval.start;

  for(let i = 0; i < count; i++) {
    const subDuration = D.ms(interval.duration.ms / count)

    const subInterval = new IntervalImpl(start, subDuration)
    ret.push(subInterval)
    start = addDuration(subDuration)(start)
  }

  return ret;
}

/**
 * Partition an Interval into chunks of a given Duration. The last Interval may be shorter than the provided Duration.
 */
const partitionByDuration = (duration: D.Duration) => (interval: Interval): Interval[] => []

export const containsDate = (i: Interval) => (d: Date) =>
  d.getTime() >= i.start.getTime() && d.getTime() <= i.end.getTime(); // start <= d <= end

export const clampDate = (i: Interval) => (d: Date) => 1;

/**
 * Determines whether two intervals are overlapping. 
 */
export const isOverlapping = (that: Interval) => (self: Interval) =>
  containsDate(self)(that.start) || containsDate(self)(that.end);

/**
 * Extends the duration of an Interval
 */
export const extendBy = (d: D.Duration) => (i: Interval) =>
  new IntervalImpl(i.start, D.add(d)(i.duration));

/**
 * Shortens the duration of an Interval
 */
export const shortenBy = (d: D.Duration) => (i: Interval) =>
  new IntervalImpl(i.start, D.sub(d)(i.duration));

/**
 * Repeats an Interval some number of times using the end of the previous interval (+ a gap) as the beginning of the next interval. 
 * Each w/ the same duration
 */
export const sequence = (times: number, gap?: D.Duration) => (self: Interval): Interval[] => {
  let res: Interval[] = [];
  let start: Date = self.start;

  for(let i = 0; i < times; i++) {
    const newInterval = new IntervalImpl(start, self.duration);
    res.push(newInterval);
    start = addDuration(self.duration, gap || D.zero())(start)
  }

  return res;
}