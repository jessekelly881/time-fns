// Represents an amount of time in ms/ns
export interface Duration {
    _tag: "Duration"
    ms: number;
}

class DurationImpl {
    readonly _tag =  "Duration";
    constructor(readonly ms: number) {}
}

export const ms = (ms: number): Duration => new DurationImpl(ms)

export const seconds = (seconds: number): Duration => new DurationImpl(seconds * 1000)

export const minutes = (minutes: number): Duration => new DurationImpl(minutes * 1000 * 60)

export const hours = (hours: number): Duration => new DurationImpl(hours * 1000 * 60 * 60)

export const times = (n: number) => (d: Duration): Duration => new DurationImpl(d.ms * n)

export const add = (that: Duration) => (self: Duration): Duration => new DurationImpl(self.ms + that.ms)