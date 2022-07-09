const { Pitch, Interval, Note, Chord } = require("./dist/index.js");
const array = [];
for (let i = 0; i < 10; i++) {
  const pitch = new Pitch("C2");
  pitch.mul(i + 1);
  array[i] = pitch.offset;
}
console.log(array);

const b = new Note("B");
const f = new Note("F");
const i = b.getInterval(f);
console.log(i.toString());
console.log(new Interval("M10+1").toString());

const chord = new Chord(
    new Pitch("C4"),
    new Pitch("E4"),
    new Pitch("G4"),
    new Pitch("Bb4"),
);
console.log(chord.ratio);
console.log(chord.phantomBase.toString());
