import Sol from "..";

const { Random } = Sol;

const r = new Random("1");

test("Seeded random", () => {
    expect(r.int32()).toBe(new Random("1").int32());
});
