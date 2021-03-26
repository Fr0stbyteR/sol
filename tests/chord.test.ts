import Pitch from "../src/Pitch";
import Chord from "../src/Chord";

const c = new Chord(new Pitch("C1"), new Pitch("bC2"), new Pitch("#C1"));
const cmaj = new Chord(new Pitch("C1"), new Pitch("E1"), new Pitch("G1"));

test("Test chord 1", () => {
    expect(c.toString()).toBe("C1:A1,d1+1");
});

test("Chord 1 notes", () => {
    expect(c.notes.toString()).toBe("C1,#C1,bC2");
});

test("Chord 1 contains", () => {
    expect(c.contains(new Pitch("#C1"))).toBe(true);
});

test("Major Chord", () => {
    expect(cmaj.enumChord.name()).toBe("MAJ");
});
