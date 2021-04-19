import Pitch from "../src/Pitch";

const fss0 = new Pitch("F##0");

test("Pitch creation F##0 = 19", () => {
    expect(fss0.offset).toBe(19);
});

test("Pitch addition F##0 + A4", () => {
    expect(fss0.clone().add("A4").toString()).toBe(new Pitch("B##0").toString());
});

test("Pitch addition F##0 + A4 = 25", () => {
    expect(fss0.clone().add("A4").offset).toBe(25);
});

test("Pitch creation from frequency", () => {
    expect(Pitch.fromFrequency(440).offset).toBe(69);
});
