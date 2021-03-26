import { EnumScale } from "../src/Scale";

const m = EnumScale.MINOR;

test("Minor scale", () => {
    expect(m.size).toBe(7);
    expect(m.intervals[0].toString()).toBe("P1");
    expect(m.intervals[6].toString()).toBe("m7");
});
