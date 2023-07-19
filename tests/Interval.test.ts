import { describe, it, expect } from "vitest";
import { make, extendBy } from "../src/Interval";
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
})