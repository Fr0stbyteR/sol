import Interval from "../src/Interval";
import Note from "../src/Note";

const c = new Note("C");
const g = new Note("g");
const gs = new Note("G#");
const cs = new Note("C#");
const cb = new Note("Cb");
const bb = new Note("Bb");
const as = new Note("A#");

test("Interval G# -> C", () => {
    expect(gs.getInterval(c).toString()).toBe(new Interval("d4-1").toString());
});

test("Interval C# -> G", () => {
    expect(cs.getInterval(g).toString()).toBe(new Interval("d5").toString());
});

test("Interval C -> Cb", () => {
    expect(c.getInterval(cb).toString()).toBe(new Interval("d1").toString());
});

test("Interval C -> C#", () => {
    expect(c.getInterval(cs).toString()).toBe(new Interval("A1").toString());
});

test("Interval C -> Bb", () => {
    expect(c.getInterval(bb).toString()).toBe(new Interval("m7").toString());
});

test("Interval C -> A#", () => {
    expect(c.getInterval(as).toString()).toBe(new Interval("A6").toString());
});

test("Interval reverse M3", () => {
    expect(new Interval("M3").reverse().toString()).toBe(new Interval("m6-1").toString());
});
