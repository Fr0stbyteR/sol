import { Interval, isIntervalArray } from "./Interval";
import { Note, isNoteArray, isNote } from "./Note";
import { Pitch, isPitchArray } from "./Pitch";
import { Enum } from "./Enum";

type TEnumChordValue = "MAJ" | "MIN" | "AUG" | "DIM" | "SUS2" | "SUS" | "SUS4" | "DOM7" | "MAJ7" | "MINMAJ7" | "MIN7" | "AUGMAJ7" | "AUG7" | "DIMMIN7" | "DIM7" | "DOM7DIM5";
export class EnumChord extends Enum {
    protected static indexes = ["MAJ", "MIN", "AUG", "DIM", "SUS2", "SUS", "SUS4", "DOM7", "MAJ7", "MINMAJ7", "MIN7", "AUGMAJ7", "AUG7", "DIMMIN7", "DIM7", "DOM7DIM5"] as TEnumChordValue[];
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
    private constructor(nameIn: string, ...intervalsIn: string[]) {
        super();
        this._name = nameIn;
        this.intervals = Interval.fromArray(...intervalsIn);
    }
    static byChord(chordIn: Chord) {
        return this.values<Chord>().find((enumChord) => {
            return enumChord.intervals.length === chordIn.intervals.length
                    && enumChord.intervals.every((interval, i) => interval.equals(chordIn.intervals[i]));
        }) || null;
    }
    static byName(chordIn: TEnumChordValue) {
        return EnumChord[chordIn];
    }
}
export type TChord = { base: Note | Pitch; intervals: Interval[]; isAbsolute: boolean };
export const isChord = (x: any): x is TChord | Chord => {
    return typeof x === "object"
            && isNote(x.base)
            && isIntervalArray(x.intervals)
            && typeof x.isAbsolute === "boolean";
};
export class Chord implements Iterable<Note> {
    base: Note | Pitch;
    intervals: Interval[]; // Intervals from base
    isAbsolute: boolean;
    /**
     * Gives a new Chord instance (clone)
     * @param {(Chord | TChord)} chordIn
     * @memberof Chord
     */
    constructor(chordIn: Chord | TChord);
    /**
     * Construct chord by notes
     * @param {(Note | Pitch | string)} base
     * @param {(...Note[] | Pitch[])} notes
     * @memberof Chord
     */
    constructor(base: Note | Pitch | string, ...notes: Note[] | Pitch[]);
    /**
     * Construct chord by intervals
     * @param {Pitch} base
     * @param {...Pitch[]} pitches
     * @memberof Chord
     */
    constructor(base: Note | Pitch | string, ...intervals: Interval[] | string[]);
    constructor(first: Chord | TChord | Note | Pitch | string, ...arrayIn: Note[] | Pitch[] | Interval[] | string[]) {
        this.base = null;
        this.intervals = [];
        this.isAbsolute = false;
        if (isChord(first)) {
            this.base = first.base;
            this.intervals = first.intervals;
            this.isAbsolute = first.isAbsolute;
        } else if (typeof first === "string") {
            const isPitch = Pitch.REGEX.exec(first);
            if (isPitch) this.base = new Pitch(first);
            else this.base = new Note(first);
        } else {
            this.base = first;
        }
        this.isAbsolute = true;
        if ((arrayIn as (Pitch | Note | Interval | string)[]).find(e => e instanceof Note && !(e instanceof Pitch))) this.isAbsolute = false;
        if (!this.isAbsolute) this.base = new Note(this.base);
        if (isPitchArray(arrayIn) && this.isAbsolute) {
            this.intervals = arrayIn.sort(Pitch.compare).map(pitch => this.base.getInterval(pitch));
        } else if (isNoteArray(arrayIn)) {
            this.intervals = (arrayIn as Note[]).map(note => (this.base as Note).getInterval(note));
        } else if (isIntervalArray(arrayIn)) {
            this.intervals = arrayIn.sort(Interval.compare);
        } else {
            this.intervals = Interval.fromArray(...arrayIn).sort(Interval.compare);
        }
        return this;
    }
    get size() {
        return this.intervals.length + 1;
    }
    get notes() {
        return [this.base, ...this.intervals.map(i => this.base.clone().add(i))];
    }
    contains(noteIn: Note | Pitch) {
        return !!this.notes.find(note => noteIn.equals(note));
    }
    getEnumChord() {
        return EnumChord.byChord(this);
    }
    toString() {
        return this.base.toString() + ":" + this.intervals.toString();
    }
    clone() {
        return new Chord(this);
    }

    [Symbol.iterator](): Iterator<Note | Pitch> {
        const o = this;
        let i = -1;
        return {
            next() {
                let value: Note | Pitch;
                let done = true;
                if (i < o.intervals.length) {
                    value = i === -1 ? o.base : o.base.clone().add(o.intervals[i]);
                    i++;
                    done = false;
                }
                return { value, done };
            }
        };
    }
}
