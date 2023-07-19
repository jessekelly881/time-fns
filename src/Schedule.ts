import { Duration } from "./Duration";
import { Interval } from "./Interval";

/** 
 * Represents a schedule. E.g. Every tuesday from 1pm to 3pm.
 */ 
interface Schedule {
    _tag:  "Schedule";
    intervals: Iterable<Interval>
}

class ScheduleImpl implements Schedule {
    readonly _tag = "Schedule"
    constructor(readonly intervals: Iterable<Interval>) {}

    // [Symbol.iterator]
}

/**
 * An empty schedule. I.e. `never`
 */
const empty = (): Schedule => new ScheduleImpl([])

const fromInterval = (i: Interval): Schedule => new ScheduleImpl([i])

/**
 * Represents repeating an interval of time. 
 * periodic(hour(1), hour(1))(new Date()) would create a schedule starting now, that runs for one hour than pauses for 1 hr forever. 
const periodic = (period: Duration, gap?: Duration) => (start: Date) => 1;
 */

// union
// intersect

// fromIntervals
// fromIntervalsWithGap
// parseCron 

// run - Runs a fn on a given schedule.