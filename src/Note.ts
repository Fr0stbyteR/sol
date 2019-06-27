import { floorMod } from "./Utils";
import { Interval, TIntervalOffset, DEGREE_TO_OFFSET } from "./Interval";
import { Enum } from "./Enum";

type TEnumNoteValue = "C" | "D" | "E" | "F" | "G" | "A" | "B";
export class EnumNote extends Enum {
    protected static indexes: TEnumNoteValue[] = ["C", "D", "E", "F", "G", "A", "B"];
    private static offsetMap: { [key: number]: TEnumNoteValue } = { 0: "C", 2: "D", 4: "E", 5: "F", 7: "G", 9: "A", 11: "B" };
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
        return this;
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
    if (!Array.isArray(x)) return false;
    return x.every(el => el instanceof Note);
};
export class Note implements INote {
    static REGEX = /^([b#]*)([a-gA-G])$/;
    enumNote: EnumNote;
    alteration: number;
    /**
     * Returns C
     * @memberof Note
     */
    constructor()
    /**
     * New note
     * @param {EnumNote} noteIn
     * @param {number} [alteration]
     * @memberof Note
     */
    constructor(noteIn: EnumNote, alteration?: number)
    /**
     * Gives a new Note instance (clone)
     * @param {INote} noteIn
     * @memberof Note
     */
    constructor(noteIn: INote)
    /**
     * Parses note string.
     * @example
     * new Note("##E");
     * @throws {SyntaxError} when parse failed
     * @param {string} noteIn
     * @memberof Note
     */
    constructor(noteIn: string)
    /**
     * Creates an instance of Note.
     * @param {number} offset
     * @param {number} [alteration]
     * @memberof Note
     */
    constructor(offset: number, alteration?: number)
    constructor(first?: EnumNote | INote | string | number, second?: number) {
        this.enumNote = EnumNote.C;
        this.alteration = 0;
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
    add(iIn: number | string | Interval) {
        if (typeof iIn === "number") return this.fromOffset(this.offset + iIn);
        let i: Interval;
        if (typeof iIn === "string") i = new Interval(iIn);
        else if (iIn instanceof Interval) i = iIn;
        const newEnumNote = EnumNote.byIndex(this.enumNote.index + i.degree - 1);
        this.alteration += i.offset - 12 * i.octave - floorMod(newEnumNote.offset - this.enumNote.offset, 12);
        this.enumNote = newEnumNote;
        return this;
    }
    sub(iIn: number | string | Interval) {
        if (typeof iIn === "number") return this.fromOffset(this.offset - iIn);
        let i: Interval;
        if (typeof iIn === "string") i = new Interval(iIn);
        else if (iIn instanceof Interval) i = iIn;
        const newEnumNote = EnumNote.byIndex(this.enumNote.index - i.degree + 1);
        this.alteration += i.offset - 12 * i.octave - floorMod(this.enumNote.offset - newEnumNote.offset, 12);
        this.enumNote = newEnumNote;
        return this;
    }
    equals(noteIn: object) {
        return isNote(noteIn)
            && this.enumNote.equals(noteIn.enumNote)
            && this.alteration === noteIn.alteration;
    }
    getInterval(noteIn: INote) {
        if (!isNote(noteIn)) throw new TypeError("Cannot get Interval with other object than Note");
        const that = noteIn instanceof Note ? noteIn : new Note(noteIn);
        const degree = that.enumNote.index - this.enumNote.index + 1;
        const onset = that.offset - this.offset - Interval.getOffsetFromDegree(degree);
        const octave = 0;
        return new Interval(degree, onset, octave);
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
}
