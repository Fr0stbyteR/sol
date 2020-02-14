import { Interval, isIntervalArray } from "./Interval";
import { Note, isNoteArray, isNote } from "./Note";
import { Pitch, isPitchArray } from "./Pitch";
import { Enum } from "./Enum";
import { nearestFraction } from "./Utils";
import { Frequency } from "./Frequency";

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
    private constructor(first: string | EnumChord, ...intervalsIn: string[]) {
        super();
        if (typeof first === "string") {
            this._name = first;
            this.intervals = Interval.fromArray(...intervalsIn);
        } else {
            this._name = first._name;
            this.intervals = first.intervals.map(i => i.clone());
        }
        return this;
    }
    static byChord(chordIn: IChord) {
        return this.values<EnumChord>().find((enumChord) => {
            return enumChord.intervals.length === chordIn.intervals.length
                && enumChord.intervals.every((interval, i) => interval.equals(chordIn.intervals[i]));
        }) || null;
    }
    static byName(chordIn: TEnumChordName) {
        return EnumChord[chordIn];
    }
    toChord(base: Note | Pitch | string) {
        return new Chord(base, ...this.intervals);
    }
    name() {
        return this._name;
    }
    equals(chordIn: object) {
        return isChord(chordIn)
            && "intervals" in chordIn
            && isIntervalArray(chordIn.intervals)
            && chordIn.intervals.length === this.intervals.length
            && chordIn.intervals.every((e, i) => this.intervals[i].equals(e));
    }
    clone() {
        return new EnumChord(this);
    }
}
export interface IChord {
    base: Note | Pitch;
    intervals: Interval[];
}
export const isChord = (x: any): x is IChord => {
    return x instanceof Chord
        || (typeof x === "object"
        && isNote(x.base)
        && isIntervalArray(x.intervals));
};
export const isChordArray = (x: any): x is Chord[] => {
    return Array.isArray(x)
        && x.every(e => e instanceof Chord);
};
export class Chord implements Iterable<Note>, IChord {
    base: Note | Pitch;
    intervals: Interval[]; // Intervals from base
    /**
     * Gives a new Chord instance (clone)
     * @param {IChord} chordIn
     * @memberof Chord
     */
    constructor(chordIn: IChord);
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
    constructor(first: IChord | Note | Pitch | string, ...arrayIn: Note[] | Pitch[] | Interval[] | string[]) {
        this.base = null;
        this.intervals = [];
        if (isChord(first)) {
            this.base = first.base;
            this.intervals = first.intervals;
        } else if (typeof first === "string") {
            const isPitch = Pitch.REGEX.exec(first);
            if (isPitch) this.base = new Pitch(first);
            else this.base = new Note(first);
        } else {
            this.base = first;
        }
        let isAbsolute = true;
        if ((arrayIn as (Pitch | Note | Interval | string)[]).find(e => e instanceof Note && !(e instanceof Pitch))) isAbsolute = false;
        if (!isAbsolute) this.base = new Note(this.base);
        if (isPitchArray(arrayIn)) {
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
    get notes(): Note[] | Pitch[] {
        return [this.base, ...this.intervals.map(i => this.base.clone().add(i))];
    }
    get isAbsolute() {
        return this.base instanceof Pitch;
    }
    contains(noteIn: Note | Pitch) {
        for (const note of this.notes) {
            if (noteIn.equals(note)) return true;
        }
        return false;
    }
    inverseUp() {
        if (this.intervals.length === 0) return this;
        const interval0 = this.intervals[0];
        this.base.add(interval0);
        for (let i = 0; i < this.intervals.length - 1; i++) {
            this.intervals[i] = this.intervals[i + 1].sub(interval0);
        }
        this.intervals[this.intervals.length - 1] = interval0.octaveReverse();
        return this;
    }
    inverseDown() {
        if (this.intervals.length === 0) return this;
        const interval0 = this.intervals[this.intervals.length - 1].octaveReverse();
        this.base.sub(interval0);
        for (let i = this.intervals.length - 1; i > 0; i--) {
            this.intervals[i] = this.intervals[i - 1].add(interval0);
        }
        this.intervals[0] = interval0;
        return this;
    }
    inverse(inversion: number) {
        if (this.intervals.length === 0) return this;
        if (inversion > 0) {
            for (let i = 0; i < inversion; i++) {
                this.inverseUp();
            }
        }
        if (inversion < 0) {
            for (let i = 0; i > inversion; i--) {
                this.inverseDown();
            }
        }
        return this;
    }
    getEnumChord() {
        return EnumChord.byChord(this);
    }
    getImaginaryBase() {
        const { notes } = this;
        const { getRatio, THRES_AUDIT } = Frequency;
        const bases = [];
        for (let i = 0; i < notes.length - 1; i++) {
            for (let j = i + 1; j < notes.length; j++) {
                const d = notes[j].offset - notes[i].offset;
                const f = nearestFraction(getRatio(d), THRES_AUDIT);
                bases.push(notes[i].clone().div(f[0]));
            }
        }
        return bases;
    }
    equals(chordIn: object) {
        return isChord(chordIn)
            && chordIn.base.equals(this.base)
            && chordIn.intervals.length === this.intervals.length
            && chordIn.intervals.every((e, i) => this.intervals[i].equals(e));
    }
    toString() {
        return this.base.toString() + ":" + this.intervals.toString();
    }
    clone() {
        return new Chord(this);
    }

    * [Symbol.iterator](): Iterator<Note | Pitch> {
        for (const interval of this.intervals) {
            yield this.base.clone().add(interval);
        }
    }
}
