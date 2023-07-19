import { describe, it, expect } from "vitest";
import { seconds } from "../src/Duration";


describe("Duration", () => {
    it("seconds", () => {
        expect(seconds(1)).toEqual({ _tag: "Duration", ms: 1000 })
    })
})
