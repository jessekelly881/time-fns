import { describe, it, expect } from "vitest";
import { make, getDuration } from "../src/Interval";
import { seconds } from "../src/Duration";
import { addDuration } from "../src/Date"

const now = new Date();
const timeIn30s = addDuration(seconds(30))(now)
const next30s = make(now, timeIn30s)

describe("Interval", () => {
    it("getDuration", () => {
        expect(getDuration(next30s).ms).toBe(30000)
    })
})
