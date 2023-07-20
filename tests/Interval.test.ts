import { describe, it, expect } from "vitest";
import { make, extendBy, shortenBy, sequence, partition } from "../src/Interval";
import { seconds } from "../src/Duration";
import { addDuration } from "../src/Date"

const start = new Date("1970-01-01T00:00:00.000Z")
const interval30s = make(start, seconds(30));

describe("Interval", () => {
    it("Interval.end", () => {
        expect(interval30s.end).toEqual(new Date("1970-01-01T00:00:30.000Z"))
    })

    it("extendBy", () => {
        const extendedInterval = extendBy(seconds(5))(interval30s) // 35s
        expect(extendedInterval.end).toEqual(new Date("1970-01-01T00:00:35.000Z"))
    })

    it("shortenBy", () => {
        const extendedInterval = shortenBy(seconds(5))(interval30s) // 25s
        expect(extendedInterval.end).toEqual(new Date("1970-01-01T00:00:25.000Z"))
    })
    
    it("partition", () => {
        const intervals = partition(3)(interval30s) // 3 * 10s Intervals
        expect(intervals).toEqual([
            make(start, seconds(10)),
            make(addDuration(seconds(10))(start), seconds(10)),
            make(addDuration(seconds(20))(start), seconds(10))
        ])
    })

    it("sequence", () => {
        const intervals = sequence(2)(interval30s) 
        expect(intervals).toEqual([
            make(start, seconds(30)),
            make(addDuration(seconds(30))(start), seconds(30))
        ])

        const intervalsWithGap = sequence(2, seconds(1))(interval30s) 
        expect(intervalsWithGap).toEqual([
            make(start, seconds(30)),
            make(addDuration(seconds(31))(start), seconds(30))
        ])
    })
})