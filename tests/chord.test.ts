import Pitch from "../src/Pitch";
import Chord from "../src/Chord";
import EnumChord from "../src/EnumChord";

const c = new Chord(new Pitch("C1"), new Pitch("Cb2"), new Pitch("C#1"));
const cmaj = new Chord(new Pitch("C1"), new Pitch("E1"), new Pitch("G1"));
const cdom7 = EnumChord.DOM7.toChord("C");
const cmin = EnumChord.MIN.toChord("C");

test("Test chord 1", () => {
    expect(c.toString()).toBe("C1:d1+1,A1");
});

test("Chord 1 notes", () => {
    expect(c.notes.toString()).toBe("C1,Cb2,C#1");
});

test("Chord 1 contains", () => {
    expect(c.contains(new Pitch("C#1"))).toBe(true);
});

test("Major Chord", () => {
    expect(cmaj.enumChord?.name()).toBe("MAJ");
});

test("ratio", () => {
    expect(cdom7.ratio).toEqual([4, 5, 6, 7]);
});

test("imaginary base", () => {
    expect(cdom7.phantomBase.toString()).toBe("C");
});

test("reciprocal", () => {
    expect(cmin.reciprocal).toEqual([6, 5, 4]);
});

test("imaginary top", () => {
    expect(cmin.phantomTop.toString()).toBe("G");
});
