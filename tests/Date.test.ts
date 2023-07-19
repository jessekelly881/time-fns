import { describe, it, expect } from "vitest";
import { addDuration, floorTo } from "../src/Date";
import { ms } from "../src/Duration";

const date = new Date("1970-01-01T00:00:00.000Z")

describe("Date", () => {
    it("addDuration", () => {
        const newDate = addDuration(ms(123))(date)
        expect(newDate).toEqual(new Date("1970-01-01T00:00:00.123Z"))
    })

    it("floorTo", () => {
        const time = new Date("1970-01-01T01:12:34.567Z")
        expect(floorTo("ms")(time)).toEqual(new Date("1970-01-01T01:12:34.567Z"))
        expect(floorTo("s")(time)).toEqual(new Date("1970-01-01T01:12:34.000Z"))
        expect(floorTo("m")(time)).toEqual(new Date("1970-01-01T01:12:00.000Z"))
        expect(floorTo("h")(time)).toEqual(new Date("1970-01-01T01:00:00.000Z"))
    })
})
