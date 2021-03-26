import Tonality from "../src/Tonality";

const c = new Tonality("C");

test("C major's relative", () => {
    expect(c.clone().toRelative().toString()).toBe("A Minor");
});

test("C major's relative", () => {
    expect(c.clone().toPrev().toString()).toBe("F Major");
});

test("C major's relative", () => {
    expect(c.clone().toNext().toString()).toBe("G Major");
});
