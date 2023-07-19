import { describe, it, expect } from "vitest";
import { addDuration } from "../src/Date";
import { ms } from "../src/Duration";

const date = new Date("1970-01-01T00:00:00.000Z")

describe("Date", () => {
    it("addDuration", () => {
        const newDate = addDuration(ms(123))(date)

        expect(newDate).toEqual(new Date("1970-01-01T00:00:00.123Z"))
    })
})
