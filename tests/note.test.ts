import Note from "../src/Note";

const cs = new Note(1);

test("Note creation #C", () => {
    expect(cs.toString()).toBe("#C");
});
