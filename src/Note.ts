import { floorMod } from "./utils";
import Interval, { TIntervalOffset, DEGREE_TO_OFFSET } from "./Interval";
import Enum from "./Enum";
import Frequency from "./Frequency";

type TEnumNoteValue = "C" | "D" | "E" | "F" | "G" | "A" | "B";
export class EnumNote extends Enum {
    protected static indexes: TEnumNoteValue[] = ["C", "D", "E", "F", "G", "A", "B"];
    private static offsetMap: Record<string, TEnumNoteValue> = { 0: "C", 2: "D", 4: "E", 5: "F", 7: "G", 9: "A", 11: "B" };
    static get C() { return new EnumNote(0); }
    static get D() { return new EnumNote(2); }
    static get E() { return new EnumNote(4); }
    static get F() { return new EnumNote(5); }
    static get G() { return new EnumNote(7); }
    static get A() { return new EnumNote(9); }
    static get B() { return new EnumNote(11); }
    static c = EnumNote.C;
    static d = EnumNote.D;
    static e = EnumNote.E;
    static f = EnumNote.F;
    static g = EnumNote.G;
    static a = EnumNote.A;
    static b = EnumNote.B;
    readonly offset: TIntervalOffset;
    private constructor(offsetIn: TIntervalOffset) {
        super();
        this.offset = offsetIn;
    }
    static byOffset(offsetIn: number) {
        if (typeof offsetIn !== "number") return null;
        const name = EnumNote.offsetMap[floorMod(offsetIn, 12)];
        if (name) return EnumNote[name];
        throw new SyntaxError(`No such note with offset ${offsetIn}.`);
    }
    static byIndex(indexIn: number) {
        if (typeof indexIn !== "number") return null;
        const name = EnumNote.indexes[floorMod(indexIn, 7)];
        if (name) return EnumNote[name];
        throw new SyntaxError(`No such note with index ${indexIn}.`);
    }
    name() { return EnumNote.offsetMap[this.offset]; }
    get index() { return DEGREE_TO_OFFSET.indexOf(this.offset); }
    ordinal() { return this.index; }
    equals(noteIn: object) {
        return noteIn instanceof EnumNote && noteIn.offset === this.offset;
    }
}
export interface INote {
    enumNote: EnumNote;
    alteration: number;
}
export const isNote = (x: any): x is INote => {
    return x instanceof Note
        || (typeof x === "object"
        && x.enumNote instanceof EnumNote
        && typeof x.alteration === "number");
};
export const isNoteArray = (x: any): x is Note[] => {
    return Array.isArray(x)
        && x.every(el => el instanceof Note);
};
export class Note implements INote, IComputable<Note>, IClonable<Note> {
    static readonly REGEX = /^([b#]*)([a-gA-G])$/;
    static readonly isNote = isNote;
    static readonly isNoteArray = isNoteArray;
    static readonly EnumNote = EnumNote;

    enumNote: EnumNote;
    alteration: number;
    /**
     * Returns C
     */
    constructor()
    /**
     * New note
     */
    constructor(noteIn: EnumNote, alteration?: number)
    /**
     * Gives a new Note instance (clone)
     */
    constructor(noteIn: INote)
    /**
     * Parses note string.
     * @example
     * new Note("##E");
     * @throws {SyntaxError} when parse failed
     */
    constructor(noteIn: string)
    /**
     * Creates an instance of Note.
     */
    constructor(offset: number, alteration?: number);
    constructor(first?: EnumNote | INote | string | number, second?: number) {
        this.enumNote = EnumNote.C;
        this.alteration = 0;
        this.become(first, second);
    }
    become(first?: EnumNote | INote | string | number, second?: number) {
        if (first instanceof EnumNote) {
            this.enumNote = first;
            if (second) this.alteration = second;
        } else if (isNote(first)) {
            this.enumNote = first.enumNote;
            this.alteration = first.alteration;
        } else if (typeof first === "string") {
            this.fromString(first);
        } else if (typeof first === "number") {
            this.fromOffset(first, second);
        }
        return this;
    }
    static fromString(nameIn: string): INote {
        const matched = Note.REGEX.exec(nameIn);
        if (matched === null) throw new SyntaxError(`No such note ${nameIn}.`);
        const enumNote = EnumNote[matched[2] as TEnumNoteValue];
        let alteration = 0;
        matched[1].split("").forEach(c => alteration += c === "#" ? 1 : -1);
        return { enumNote, alteration };
    }
    protected fromString(nameIn: string) {
        const { enumNote, alteration } = Note.fromString(nameIn);
        this.enumNote = enumNote;
        this.alteration = alteration;
        return this;
    }
    static fromOffset(offsetIn: number, alterationIn?: number): INote {
        const note = floorMod(offsetIn, 12);
        let offset = 11;
        for (let i = DEGREE_TO_OFFSET.length - 1; i >= 0; i--) {
            const el = DEGREE_TO_OFFSET[i];
            if (el <= note) {
                offset = el;
                break;
            }
        }
        const enumNote = EnumNote.byOffset(offset);
        let alteration = note - offset;
        if (alterationIn) alteration += alterationIn;
        return { enumNote, alteration };
    }
    protected fromOffset(offsetIn: number, alterationIn?: number) {
        const { enumNote, alteration } = Note.fromOffset(offsetIn, alterationIn);
        this.enumNote = enumNote;
        this.alteration = alteration;
        return this;
    }
    static ratioToOffset(ratio: number) {
        return Math.round(Math.log(ratio) / Math.log(Frequency.SEMITONE));
    }
    static offsetToRatio(offset: number) {
        return Frequency.SEMITONE ** offset;
    }
    add(semitones: number): Note;
    add(interval: string | Interval): Note;
    add(noteIn: Note): Note
    add(first: number | string | Interval | Note) {
        if (typeof first === "number") return this.fromOffset(this.offset + first);
        if (first instanceof Note) return this.become(first);
        let i: Interval;
        if (typeof first === "string") i = new Interval(first);
        else if (first instanceof Interval) i = first;
        const newEnumNote = EnumNote.byIndex(this.enumNote.index + i.degree - 1);
        this.alteration += i.offset - 12 * i.octave - floorMod(newEnumNote.offset - this.enumNote.offset, 12);
        this.enumNote = newEnumNote;
        return this;
    }
    static add(a: Note, b: Note) {
        return a.clone().add(b);
    }
    sub(semitones: number): Note;
    sub(interval: string | Interval): Note;
    sub(noteIn: Note): Note
    sub(first: number | string | Interval | Note) {
        if (typeof first === "number") return this.fromOffset(this.offset - first);
        if (first instanceof Note) return this.become(first);
        let i: Interval;
        if (typeof first === "string") i = new Interval(first);
        else if (first instanceof Interval) i = first;
        const newEnumNote = EnumNote.byIndex(this.enumNote.index - i.degree + 1);
        this.alteration += i.offset - 12 * i.octave - floorMod(this.enumNote.offset - newEnumNote.offset, 12);
        this.enumNote = newEnumNote;
        return this;
    }
    static sub(a: Note, b: Note) {
        return a.clone().sub(b);
    }
    mul(fIn: number) {
        return this.add(Note.ratioToOffset(fIn));
    }
    static mul(a: Note, b: number) {
        return a.clone().mul(b);
    }
    div(fIn: number): Note;
    div(noteIn: Note): number;
    div(first: number | Note) {
        if (first instanceof Note) return Note.offsetToRatio(this.offset - first.offset);
        return this.mul(1 / first);
    }
    static div(a: Note, b: number): Note;
    static div(a: Note, b: Note): number;
    static div(a: Note, b: Note | number) {
        if (typeof b === "number") return a.clone().div(b);
        return a.clone().div(b);
    }
    equals(noteIn: object) {
        return isNote(noteIn)
            && this.enumNote.equals(noteIn.enumNote)
            && this.alteration === noteIn.alteration;
    }
    compareTo(that: Note): number {
        return Note.compare(this, that);
    }
    static compare(x: Note, y: Note) {
        return x.offset - y.offset;
    }
    getInterval(noteIn: INote) {
        const that = noteIn instanceof Note && noteIn.constructor === Note ? noteIn : new Note(noteIn);
        const degree = that.enumNote.index - this.enumNote.index + 1;
        const onset = that.offset - this.offset - Interval.getOffsetFromDegree(degree);
        const octave = 0;
        return new Interval(degree, onset, octave);
    }
    getDistance(that: Note) {
        const distance = Math.abs(this.offset - that.offset);
        return distance > 6 ? 12 - distance : distance;
    }
    get offset() {
        return this.enumNote.offset + this.alteration;
    }
    static fromArray(...arrayIn: (string | number | INote)[]) {
        return arrayIn.map(e => new Note(e as any));
    }
    toString() {
        return (this.alteration > 0 ? "#" : "b").repeat(Math.abs(this.alteration)) + this.enumNote.name();
    }
    clone() {
        return new Note(this);
    }

    getTendancy(that: Note) {
        const d = this.getDistance(that);
        return d === 0 || d > 2 ? 0 : 1 / d;
    }
    getStability(that: Note) {
        const d = this.getDistance(that);
        const [, f] = new Interval(Interval.fromOffset(d)).fraction;
        return 1 / f;
    }
}

export default Note;
