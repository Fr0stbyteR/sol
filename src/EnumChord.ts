import Interval, { IInterval, isIntervalArray } from "./Interval";
import Note from "./Note";
import Pitch from "./Pitch";
import Enum from "./Enum";
import { IChord, Chord, isChord } from "./Chord";

export interface IEnumChord {
    className: "EnumChord";
    intervals: IInterval[];
}
export const isEnumChord = (x: any): x is IEnumChord => {
    return x instanceof EnumChord
        || (typeof x === "object"
        && x !== null
        && x.className === "EnumChord"
        && isIntervalArray(x.intervals));
};
type TEnumChordName = "MAJ" | "MIN" | "AUG" | "DIM" | "SUS2" | "SUS" | "SUS4" | "DOM7" | "MAJ7" | "MINMAJ7" | "MIN7" | "AUGMAJ7" | "AUG7" | "DIMMIN7" | "DIM7" | "DOM7DIM5";
export class EnumChord extends Enum {
    protected static indexes = ["MAJ", "MIN", "AUG", "DIM", "SUS2", "SUS", "SUS4", "DOM7", "MAJ7", "MINMAJ7", "MIN7", "AUGMAJ7", "AUG7", "DIMMIN7", "DIM7", "DOM7DIM5"] as TEnumChordName[];
    static get MAJ() { return new EnumChord("MAJ", "M3", "P5"); }
    static get MIN() { return new EnumChord("MIN", "m3", "P5"); }
    static get AUG() { return new EnumChord("AUG", "M3", "A5"); }
    static get DIM() { return new EnumChord("DIM", "m3", "d5"); }
    static get SUS2() { return new EnumChord("SUS2", "M2", "P5"); }
    static get SUS() { return new EnumChord("SUS", "P5", "P5"); }
    static get SUS4() { return new EnumChord("SUS4", "P5", "P5"); }
    static get DOM7() { return new EnumChord("DOM7", "M3", "P5", "m7"); }
    static get MAJ7() { return new EnumChord("MAJ7", "M3", "P5", "M7"); }
    static get MINMAJ7() { return new EnumChord("MINMAJ7", "m3", "P5", "M7"); }
    static get MIN7() { return new EnumChord("MIN7", "m3", "P5", "m7"); }
    static get AUGMAJ7() { return new EnumChord("AUGMAJ7", "M3", "A5", "M7"); }
    static get AUG7() { return new EnumChord("AUG7", "M3", "A5", "m7"); }
    static get DIMMIN7() { return new EnumChord("DIMMIN7", "m3", "d5", "m7"); }
    static get DIM7() { return new EnumChord("DIM7", "m3", "d5", "d7"); }
    static get DOM7DIM5() { return new EnumChord("DOM7DIM5", "M3", "d5", "m7"); }

    _name: string;
    intervals: Interval[];
    private constructor(nameIn: string, ...intervalsIn: string[]);
    private constructor(chord: EnumChord);
    private constructor(p1: string | EnumChord, ...intervalsIn: string[]) {
        super();
        if (typeof p1 === "string") {
            this._name = p1;
            this.intervals = Interval.fromArray(intervalsIn);
        } else {
            this._name = p1._name;
            this.intervals = p1.intervals.map(i => i.clone());
        }
    }
    static from(that: IChord | IEnumChord) {
        return this.byChord(that);
    }
    static byChord(chordIn: IChord | IEnumChord) {
        return this.values<EnumChord>().find((enumChord) => {
            return enumChord.intervals.length === chordIn.intervals.length
                && enumChord.intervals.every((interval, i) => interval.equals(chordIn.intervals[i]));
        }) || null;
    }
    static byName(chordIn: TEnumChordName) {
        return EnumChord[chordIn];
    }
    get className() {
        return "EnumChord" as const;
    }
    toChord(base: Note | Pitch | string) {
        return new Chord(base, ...this.intervals);
    }
    name() {
        return this._name;
    }
    equals(chordIn: any) {
        return (isChord(chordIn) || isEnumChord(chordIn))
            && chordIn.intervals.length === this.intervals.length
            && chordIn.intervals.every((e, i) => this.intervals[i].equals(e));
    }
    clone() {
        return new EnumChord(this);
    }
}
