/* eslint-disable no-console */
import { Interval } from "./Interval";
import { Note } from "./Note";
import { Pitch } from "./Pitch";
import { Frequency } from "./Frequency";
import { Chord } from "./Chord";
import { EnumScale } from "./Scale";
import { Tonality } from "./Tonality";

new Note("#G").getInterval(new Note("C"));
console.log(new Note("#G").getInterval(new Note("C")).toString());
console.log(new Note("#C").getInterval(new Note("G")).toString());
console.log(new Note("C").getInterval(new Note("bC")).toString());
console.log(new Note("C").getInterval(new Note("#C")).toString());
console.log(new Note("C").getInterval(new Note("bB")).toString());
console.log(new Note("C").getInterval(new Note("#A")).toString());

const n = new Note(1);
console.log(n.toString());

const p = new Pitch("##F0");
console.log(p.add("A4").toString() + " " + p.offset);

const f = 440;
console.log(Frequency.toPitch(f).offset);

const c = new Chord(new Pitch("C1"), new Pitch("bC2"), new Pitch("#C1"));

console.log(c.toString());

console.log(new Interval("M3").reverse().toString());

console.log(c.notes.toString());
console.log(c.contains(new Pitch("#C1")));
const c1 = new Chord(new Pitch("C1"), new Pitch("E1"), new Pitch("G1"));
console.log(c1.getEnumChord());

const s = EnumScale.MINOR;
console.log(s.toString());
console.log(new Tonality("C").toRelative().toString());
console.log(new Tonality("C").toPrev().toString());
console.log(new Tonality("C").toNext().toString());
