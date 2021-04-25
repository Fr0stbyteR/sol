import Interval, { isIntervalArray } from "./Interval";
import Note, { isNoteArray, isNote, INote } from "./Note";
import Pitch, { isPitchArray, isPitch, IPitch } from "./Pitch";
import Enum from "./Enum";
import { isNumberArray, nearestFractions, nearestReciprocals } from "./utils";

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
export class Chord implements IChord, Iterable<Note>, IComputable<Chord>, IClonable<Chord> {
    static readonly isChord = isChord;
    static readonly isChordArray = isChordArray;
    static readonly EnumChord = EnumChord;

    base: Note | Pitch;
    intervals: Interval[]; // Intervals from base
    /**
     * Gives a new Chord instance (clone)
     */
    constructor(chordIn: IChord);
    /**
     * Construct chord by notes
     */
    constructor(base: Note | Pitch | string | number, ...notes: Note[] | Pitch[] | number[]);
    /**
     * Construct chord by intervals
     */
    constructor(base: Note | Pitch | string, ...intervals: Interval[] | string[]);
    constructor(p1: IChord | Note | Pitch | string | number, ...arrayIn: Note[] | Pitch[] | number[] | Interval[] | string[]) {
        this.base = null;
        this.intervals = [];
        this.become(p1, ...arrayIn);
    }
    become(p1: IChord | Note | Pitch | string | number, ...arrayIn: Note[] | Pitch[] | number[] | Interval[] | string[]) {
        if (isChord(p1)) {
            this.base = p1.base;
            this.intervals = p1.intervals;
        } else if (typeof p1 === "string") {
            const isNote = Note.REGEX.exec(p1);
            if (isNote) this.base = new Note(p1);
            else this.base = new Pitch(p1);
        } else if (typeof p1 === "number") {
            this.base = new Pitch(p1);
        } else {
            this.base = p1;
        }
        if (isPitchArray(arrayIn)) {
            this.intervals = arrayIn.sort(Pitch.compare).map(pitch => this.base.getInterval(pitch));
        } else if (isNoteArray(arrayIn)) {
            this.intervals = arrayIn.map(note => this.base.getInterval(note));
        } else if (isNumberArray(arrayIn)) {
            this.intervals = arrayIn.map(pitch => this.base.getInterval(new Pitch(pitch)));
        } else if (isIntervalArray(arrayIn)) {
            this.intervals = arrayIn.sort(Interval.compare);
        } else {
            this.intervals = Interval.fromArray(arrayIn).sort(Interval.compare);
        }
        return this;
    }
    get size() {
        return this.intervals.length + 1;
    }
    get notes(): Note[] | Pitch[] {
        return [this.base, ...this.intervals.map(i => this.base.clone().add(i))];
    }
    set notes(notesIn: Note[] | Pitch[]) {
        if (!notesIn.length) return;
        const [p1, ...arrayIn] = notesIn;
        this.base = p1;
        if (isPitchArray(arrayIn)) {
            this.intervals = arrayIn.sort(Pitch.compare).map(pitch => this.base.getInterval(pitch));
        } else if (isNoteArray(arrayIn)) {
            this.intervals = arrayIn.map(note => this.base.getInterval(note));
        }
    }
    get isAbsolute() {
        return this.base instanceof Pitch;
    }
    get ratio() {
        return nearestFractions([1, ...this.intervals.map(i => i.ratio)]);
    }
    get reciprocal() {
        return nearestReciprocals([1, ...this.intervals.map(i => i.ratio)]);
    }
    removeDup() {
        const { intervals } = this;
        this.intervals = intervals.filter((i0, i) => {
            const { offset } = i0;
            if (offset === 0) return false;
            if (intervals.findIndex(i1 => i1 === i0 || i1.offset === offset) === i) return true;
            return false;
        });
    }
    reorder() {
        this.intervals = this.intervals.sort(Interval.compare);
        if (this.intervals.length && this.intervals[0].offset < 0) {
            const d = this.intervals[0].reverse();
            for (let i = 1; i < this.intervals.length; i++) {
                this.intervals[i].add(d);
            }
        }
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
    get enumChord() {
        return EnumChord.byChord(this);
    }
    get imaginaryBase() {
        return this.base.clone().div(this.ratio[0]);
    }
    get imaginaryTop() {
        return this.base.clone().mul(this.reciprocal[0]);
    }
    add(chordIn: Chord): Chord;
    add(noteIn: INote | Note[]): Chord;
    add(pitchIn: IPitch | Pitch[]): Chord;
    add(intervalIn: Interval): Chord;
    add(p1: Chord | IPitch | Pitch[] | INote | Note[] | Interval): Chord {
        if (p1 instanceof Interval) {
            this.intervals.push(p1);
        } else if (isNote(p1)) {
            this.intervals.push(this.base.getInterval(p1));
        } else if (isNoteArray(p1)) {
            this.intervals.push(...(p1 as Array<Note | Pitch>).map(p => this.base.getInterval(p)));
        } else {
            const d = this.base.getInterval(p1.base);
            for (const interval of p1.intervals) {
                this.intervals.push(d.clone().add(interval));
            }
        }
        this.reorder();
        return this;
    }
    static add(a: Chord, b: Chord) {
        return a.clone().add(b);
    }
    sub(chordIn: Chord): Chord;
    sub(noteIn: INote | Note[]): Chord;
    sub(pitchIn: IPitch | Pitch[]): Chord;
    sub(intervalIn: Interval): Chord;
    sub(p1: Chord | IPitch | Pitch[] | INote | Note[] | Interval): Chord {
        if (p1 instanceof Interval) {
            this.intervals = this.intervals.filter(i0 => !i0.equals(p1));
        } else if (isNote(p1)) {
            const that = p1 instanceof Note ? p1 : isPitch(p1) ? new Pitch(p1) : new Note(p1);
            const notes = this.notes.filter(n0 => !that.equals(n0));
            if (!notes.length) return null;
            this.notes = notes;
        } else if (isNoteArray(p1)) {
            let { notes } = this;
            p1.forEach((n) => {
                const that = n instanceof Note ? n : isPitch(n) ? new Pitch(n) : new Note(n);
                notes = this.notes.filter(n0 => !that.equals(n0));
            });
            if (!notes.length) return null;
            this.notes = notes;
        } else {
            this.sub(p1.notes);
        }
        this.reorder();
        return this;
    }
    static sub(a: Chord, b: Chord) {
        return a.clone().sub(b);
    }
    compareTo(that: Chord): number {
        return Chord.compare(this, that);
    }
    static compare(x: Chord, y: Chord) {
        return x.intervals.length - y.intervals.length;
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
    async toGuidoAR(factory: PromisifiedFunctionMap<IGuidoWorker>) {
        await factory.openMusic();
        await factory.openVoice();
        await factory.openChord();
        for (const note of this.notes) {
            await note.openGuidoEvent(factory);
        }
        await factory.closeChord();
        await factory.closeVoice();
        return factory.closeMusic();
    }

    * [Symbol.iterator](): Iterator<Note | Pitch> {
        for (const note of this.notes) {
            yield note;
        }
    }

    getTendancy(that: Chord) {
        const m: number[][] = [];
        const { notes } = this;
        const { notes: $notes } = that;
        for (let i = 0; i < $notes.length; i++) {
            m[i] = [];
            for (let j = 0; j < notes.length; j++) {
                m[i][j] = notes[j].getTendancy($notes[i]);
            }
        }
        return m.map(r => Math.max(...r)).reduce((s, e) => s += e, 0) / m.length; // eslint-disable-line no-param-reassign
    }
    getStability(that: Chord) {
        const m: number[][] = [];
        const { notes } = this;
        const { notes: $notes } = that;
        for (let i = 0; i < $notes.length; i++) {
            m[i] = [];
            for (let j = 0; j < notes.length; j++) {
                m[i][j] = notes[j].getStability($notes[i]);
            }
        }
        return m.map(r => Math.max(...r)).reduce((s, e) => s += e, 0) / m.length; // eslint-disable-line no-param-reassign
    }
}

export default Chord;
