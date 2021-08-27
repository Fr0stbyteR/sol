import { Duration, Random } from "..";

const random = new Random("2");
const quarter = new Duration(1, 4);
const half = new Duration(1, 2);
const long = new Duration(3, 1);

const randomDuration = Duration.random(random, quarter, long, half);

test("Test duration divistion", () => {
    expect(randomDuration.compareTo(long)).toBeLessThan(0);
    expect(randomDuration.compareTo(quarter)).toBeGreaterThan(0);
});

test("Test duration divistion", () => {
    expect(quarter.clone().div(2).getBeats()).toBe(0.5);
});
