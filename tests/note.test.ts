import Note from "../src/Note";

const c = new Note("C");

const cs = new Note(1);

test("Note creation #C", () => {
    expect(cs.toString()).toBe("C#");
});

test("Note C * 2", () => {
    expect(c.clone().mul(2).toString()).toBe("C");
});

test("Note C * 3", () => {
    expect(c.clone().mul(3).toString()).toBe("G");
});
