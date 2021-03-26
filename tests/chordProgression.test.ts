import EnumChordProgression from "../src/genre/EnumChordProgression";

test("Chord Progression 1", () => {
    expect(EnumChordProgression.EPIC1.toString()).toBe("ChordProgression: {vi IV I V}");
});
