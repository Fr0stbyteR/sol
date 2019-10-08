/* eslint-disable no-console */
import { Interval } from "./Interval";
import { Note } from "./Note";
import { Pitch } from "./Pitch";
import { Chord } from "./Chord";
import { EnumScale } from "./Scale";
import { Tonality } from "./Tonality";
import { EnumChordProgression } from "./genre/EnumChordProgression";
import { Random } from "./genre/Random";
import { TrackNote } from "./track/TrackNote";
import { Duration } from "./Duration";
import { Segment } from "./track/Segment";
import { HClipperRight, HClipperLeft } from "./genre/modifier/HClipper";

console.log(new Pitch("C8").offset);
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
console.log(Pitch.fromFrequency(f).offset);

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

console.log(EnumChordProgression.EPIC1.toString());

console.log(new Random("1").randint(0, 100));

const tn1 = new TrackNote({ pitch: new Pitch("C1"), duration: new Duration(1, 4), offset: new Duration(0, 4) });
const tn2 = new TrackNote({ pitch: new Pitch("D1"), duration: new Duration(1, 4), offset: new Duration(1, 4) });
const tn3 = new TrackNote({ pitch: new Pitch("E1"), duration: new Duration(1, 4), offset: new Duration(2, 4) });
const seg = new Segment({ notes: [tn2, tn3, tn1], automations: [], duration: new Duration(1, 1) });
seg.notes.sort((a, b) => a.offset.compareTo(b.offset)).forEach(n => console.log(n.toString()));
HClipperLeft.use(null, seg, { duration: new Duration(1, 8), mode: "clip" });
seg.notes.sort((a, b) => a.offset.compareTo(b.offset)).forEach(n => console.log(n.toString()));
console.log(seg.duration.toString());
