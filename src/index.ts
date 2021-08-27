import Articulation from "./Articulation";
import Chord from "./Chord";
import Color from "./Color";
import Duration from "./Duration";
import Frequency from "./Frequency";
import Interval from "./Interval";
import Note from "./Note";
import Param from "./Param";
import Pitch from "./Pitch";
import Scale from "./Scale";
import TimeCode from "./TimeCode";
import TonalChord from "./TonalChord";
import Tonality from "./Tonality";
import Velocity from "./Velocity";
import Random from "./genre/Random";
import * as Utils from "./utils";
import Segment from "./track/Segment";
import Sequence from "./track/Sequence";
import Roll from "./track/Roll";
import TrackChord from "./track/TrackChord";
import TrackNote from "./track/TrackNote";
/*
export * as Articulation from "./Articulation";
export * as Chord from "./Chord";
export * as Color from "./Color";
export * as Duration from "./Duration";
export * as Frequency from "./Frequency";
export * as Interval from "./Interval";
export * as Note from "./Note";
export * as Param from "./Param";
export * as Pitch from "./Pitch";
export * as Scale from "./Scale";
export * as TimeCode from "./TimeCode";
export * as TonalChord from "./TonalChord";
export * as Tonality from "./Tonality";
export * as Velocity from "./Velocity";
*/
export /* default */ {
    Articulation,
    Chord,
    Color,
    Duration,
    Frequency,
    Interval,
    Note,
    Param,
    Pitch,
    Scale,
    TimeCode,
    TonalChord,
    Tonality,
    Velocity,
    Random,
    TrackNote,
    TrackChord,
    Sequence,
    Segment,
    Roll,
    Utils
};
/* eslint-disable no-console */
/*
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
const c2 = new Chord(new Pitch("B0"), new Pitch("D1"), new Pitch("G1"));
console.log(c1.enumChord);

const s = EnumScale.MINOR;
console.log(s.toString());
console.log(new Tonality("C").toRelative().toString());
console.log(new Tonality("C").toPrev().toString());
console.log(new Tonality("C").toNext().toString());

console.log(EnumChordProgression.EPIC1.toString());

*/
/*
const tn1 = new TrackNote({ pitch: new Pitch("C1"), duration: new Duration(1, 4), offset: new Duration(0, 4) });
const tn2 = new TrackNote({ pitch: new Pitch("D1"), duration: new Duration(1, 4), offset: new Duration(1, 4) });
const tn3 = new TrackNote({ pitch: new Pitch("E1"), duration: new Duration(1, 4), offset: new Duration(2, 4) });
const seg = new Segment({ notes: [tn2, tn3, tn1], automations: [], duration: new Duration(1, 1) });
seg.notes.sort((a, b) => a.offset.compareTo(b.offset)).forEach(n => console.log(n.toString()));
HClipper.use(seg, { start: new Duration(1, 8), end: new Duration(3, 8), mode: "clip" });
seg.notes.sort((a, b) => a.offset.compareTo(b.offset)).forEach(n => console.log(n.toString()));
console.log(seg.duration.toString());
console.log(new Interval("P5").fraction.toString());
console.log(new Interval("M3").fraction.toString());
console.log(new Interval("M2").fraction.toString());
const C3 = EnumChord.DOM7.toChord("C");
console.log(C3.ratio);
console.log(C3.imaginaryBase.toString());
const c3 = EnumChord.MIN.toChord("C");
console.log(c3.reciprocal);
console.log(c3.imaginaryVertex.toString());

console.log(Duration.random(new Random("2"), new Duration(1, 4), new Duration(3, 1), new Duration(1, 2)));
console.log(new Duration(0.03, 4).div(2));
console.log(new Pitch("C4").getStability(new Pitch("G3")));
console.log(c1.getTendancy(c2));
console.log(c1.add(c2).toString());
console.log(new Note("C").mul(2));
console.log(new Note("C").mul(3));

const c5 = EnumChord.MAJ.toChord("C");
const c4 = EnumChord.MAJ.toChord("G");
const ii = new Interval("P5");
for (let i = 0; i < 12; i++) {
    console.log(c4.toString() + ": " + c5.getStability(c4));
    c4.base.add(ii);
}
*/
