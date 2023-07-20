import { describe, it, expect } from "vitest";
import * as _ from "../src/Date";
import { ms } from "../src/Duration";

const date = new Date("1970-01-01T00:00:00.000Z")
const [a, b] = [new Date(1987, 1, 11), new Date(1989, 6, 10)];

describe("Date", () => {
    it("addDuration", () => {
        const newDate = _.addDuration(ms(123))(date)
        expect(newDate).toEqual(new Date("1970-01-01T00:00:00.123Z"))
    })

    it("floorTo", () => {
        const time = new Date("1970-01-01T01:12:34.567Z")
        expect(_.floorTo("ms")(time)).toEqual(new Date("1970-01-01T01:12:34.567Z"))
        expect(_.floorTo("s")(time)).toEqual(new Date("1970-01-01T01:12:34.000Z"))
        expect(_.floorTo("m")(time)).toEqual(new Date("1970-01-01T01:12:00.000Z"))
        expect(_.floorTo("h")(time)).toEqual(new Date("1970-01-01T01:00:00.000Z"))
    })


    it("isAfter", () => {
        expect(_.isAfter(a)(b)).to.be.true
        expect(_.isAfter(b)(a)).to.be.false
        expect(_.isAfter(b)(b)).to.be.false
    })

    it("isAfterOrEqual", () => {
        expect(_.isAfterOrEqual(a)(b)).to.be.true
        expect(_.isAfterOrEqual(b)(a)).to.be.false
        expect(_.isAfterOrEqual(b)(b)).to.be.true
    })

    it("isBefore", () => {
        expect(_.isBefore(b)(a)).to.be.true
        expect(_.isBefore(a)(b)).to.be.false
        expect(_.isBefore(b)(b)).to.be.false
    })

    it("isBeforeOrEqual", () => {
        expect(_.isBeforeOrEqual(b)(a)).to.be.true
        expect(_.isBeforeOrEqual(a)(b)).to.be.false
        expect(_.isBeforeOrEqual(b)(b)).to.be.true
    })
})
