import { floorMod, isObjectArray } from "./utils";
import Interval, { DEGREE_TO_OFFSET } from "./Interval";
import Frequency from "./Frequency";
import EnumNote, { IEnumNote, isEnumNote, TEnumNoteValue } from "./EnumNote";
import Duration from "./Duration";

export interface INote {
    enumNote: IEnumNote;
    alteration: number;
}
export const isNote = (x: any): x is INote => {
    return x instanceof Note
        || (typeof x === "object"
        && x !== null
        && isEnumNote(x.enumNote)
        && typeof x.alteration === "number");
};
export const isNoteArray = (x: any): x is INote[] => {
    return isObjectArray(x, isNote);
};
export class Note implements INote, IComputable<Note>, IClonable<Note> {
    static readonly REGEX = /^([a-gA-G])([b#x]*)$/;
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
     * new Note("E##");
     * @throws {SyntaxError} when parse failed
     */
    constructor(noteIn: string)
    /**
     * Creates an instance of Note.
     */
    constructor(offset: number, alteration?: number);
    constructor(p1?: EnumNote | INote | string | number, p2?: number) {
        this.enumNote = EnumNote.C;
        this.alteration = 0;
        this.become(p1, p2);
    }
    become(p1?: EnumNote | INote | string | number, p2?: number) {
        if (p1 instanceof EnumNote) {
            this.enumNote = p1;
            if (p2) this.alteration = p2;
        } else if (isNote(p1)) {
            this.enumNote = EnumNote.from(p1.enumNote);
            this.alteration = p1.alteration;
        } else if (typeof p1 === "string") {
            this.fromString(p1);
        } else if (typeof p1 === "number") {
            this.fromOffset(p1, p2);
        }
        return this;
    }
    static fromString(nameIn: string) {
        const matched = Note.REGEX.exec(nameIn);
        if (matched === null) throw new SyntaxError(`No such note ${nameIn}.`);
        const enumNote = EnumNote[matched[1] as TEnumNoteValue];
        let alteration = 0;
        matched[2].split("").forEach(c => alteration += c === "x" ? 2 : c === "#" ? 1 : -1);
        return { enumNote, alteration };
    }
    protected fromString(nameIn: string) {
        const { enumNote, alteration } = Note.fromString(nameIn);
        this.enumNote = enumNote;
        this.alteration = alteration;
        return this;
    }
    static fromOffset(offsetIn: number, alterationIn?: number) {
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
    add(p1: number | string | Interval | Note) {
        if (typeof p1 === "number") return this.fromOffset(this.offset + p1);
        if (p1 instanceof Note) return this.become(p1);
        let i: Interval;
        if (typeof p1 === "string") i = new Interval(p1);
        else if (p1 instanceof Interval) i = p1;
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
    sub(p1: number | string | Interval | Note) {
        if (typeof p1 === "number") return this.fromOffset(this.offset - p1);
        if (p1 instanceof Note) return this.become(p1);
        let i: Interval;
        if (typeof p1 === "string") i = new Interval(p1);
        else if (p1 instanceof Interval) i = p1;
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
    div(p1: number | Note) {
        if (p1 instanceof Note) return Note.offsetToRatio(this.offset - p1.offset);
        return this.mul(1 / p1);
    }
    static div(a: Note, b: number): Note;
    static div(a: Note, b: Note): number;
    static div(a: Note, b: Note | number) {
        if (typeof b === "number") return a.clone().div(b);
        return a.clone().div(b);
    }
    equals(noteIn: any) {
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
    static fromArray(arrayIn: (string | number | INote)[]) {
        return arrayIn.map(e => new Note(e as any));
    }
    toString() {
        return this.enumNote.name() + (this.alteration > 0 ? "#" : "b").repeat(Math.abs(this.alteration));
    }
    clone() {
        return new Note(this);
    }
    async openGuidoEvent(factory: PromisifiedFunctionMap<IGuidoWorker>, durationIn?: Duration, close = true, octaveIn = 3) {
        const { alteration } = this;
        const accidentals = Math.max(-2, Math.min(2, ~~alteration));
        const alterDetune = alteration - accidentals;
        if (alterDetune) {
            factory.openRangeTag("alter", 0);
            factory.addTagParameterFloat(alterDetune);
            factory.setParameterName("detune");
        }
        factory.openEvent(this.enumNote.name());
        factory.setEventAccidentals(this.alteration);
        factory.setOctave(octaveIn - 3);
        if (durationIn) factory.setDuration(durationIn.numerator, durationIn.denominator);
        if (close) {
            factory.closeEvent();
            if (alterDetune) {
                factory.closeTag();
                factory.endTag();
            }
        }
    }
    async toGuidoAR(factory: PromisifiedFunctionMap<IGuidoWorker>) {
        factory.openMusic();
        factory.openVoice();
        this.openGuidoEvent(factory);
        factory.closeVoice();
        return factory.closeMusic();
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
