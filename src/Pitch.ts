import { Note, EnumNote, TNote, isNote } from "./Note";
import { Interval } from "./Interval";

export type TPitch = { enumNote: EnumNote; alteration: number; octave: number };
export const isPitch = (x: any): x is TPitch | Pitch => {
    return x instanceof Pitch
        || (typeof x === "object"
            && x.enumNote instanceof EnumNote
            && typeof x.alteration === "number"
            && typeof x.octave === "number");
};
export const isPitchArray = (x: any): x is Pitch[] => {
    if (!Array.isArray(x)) return false;
    return x.every(el => el instanceof Pitch);
};
export class Pitch extends Note {
    static REGEX = /^([b#]*[a-gA-G])(-?\d+)?$/;
    octave: number;

    /**
     * Returns C0
     * @memberof Pitch
     */
    constructor();
    /**
     * Gives a new Pitch instance (clone)
     * @param {Pitch | TPitch} pitchIn
     * @memberof Pitch
     */
    constructor(pitchIn: Pitch | TPitch);
    /**
     * Add octave info to a note
     * @param {(Note | EnumNote | TNote)} noteIn
     * @param {number} [octaveIn]
     * @memberof Pitch
     */
    constructor(noteIn: Note | EnumNote | TNote, octaveIn?: number);
    /**
     * Parses pitch string.
     * @example
     * new Pitch("##E5");
     * @throws {SyntaxError} when parse failed
     * @param {string} pitchIn
     * @memberof Note
     */
    constructor(pitchIn: string);
    /**
     * Creates an instance of Pitch with index
     * @param {number} pitchIn
     * @memberof Pitch
     */
    constructor(pitchIn: number);
    /**
     * Creates an instance of Pitch with index
     * @param {number} pitchIn
     * @memberof Pitch
     */
    constructor(first?: Pitch | Note | EnumNote | TPitch | TNote | string | number, second?: number) {
        if (isPitch(first)) {
            super(first);
            this.octave = first.octave;
        } else if (first instanceof EnumNote || isNote(first)) {
            super(first);
            this.octave = second || 0;
        } else if (typeof first === "string") {
            super();
            this.fromString(first);
        } else if (typeof first === "number") {
            super(first);
            this.octave = Math.floor(first / 12 - 1);
        } else {
            super();
        }
        return this;
    }
    static fromString(nameIn: string): TPitch {
        const matched = Pitch.REGEX.exec(nameIn);
        if (matched === null) throw new SyntaxError(`No such pitch ${nameIn}.`);
        const octave = parseInt(matched[2]) || 0;
        return { ...Note.fromString(matched[1]), octave };
    }
    protected fromString(nameIn: string) {
        const { enumNote, alteration, octave } = Pitch.fromString(nameIn);
        this.enumNote = enumNote;
        this.alteration = alteration;
        this.octave = octave;
        return this;
    }
    static fromOffset(offsetIn: number): TPitch {
        return { ...super.fromOffset(offsetIn), octave: Math.floor(offsetIn / 12 - 1) };
    }
    protected fromOffset(offsetIn: number) {
        const { enumNote, alteration, octave } = Pitch.fromOffset(offsetIn);
        this.enumNote = enumNote;
        this.alteration = alteration;
        this.octave = octave;
        return this;
    }
    add(iIn: number | string | Interval) {
        if (typeof iIn === "number") return this.fromOffset(this.offset + iIn);
        let i: Interval;
        if (typeof iIn === "string") i = new Interval(iIn);
        else if (iIn instanceof Interval) i = iIn;
        this.octave += Math.floor((this.enumNote.index + i.degree - 1) / 7) + i.octave;
        return super.add(i);
    }
    sub(iIn: number | string | Interval) {
        if (typeof iIn === "number") return this.fromOffset(this.offset - iIn);
        let i: Interval;
        if (typeof iIn === "string") i = new Interval(iIn);
        else if (iIn instanceof Interval) i = iIn;
        this.octave += Math.floor((this.enumNote.index - i.degree + 1) / 7) - i.octave;
        return super.sub(i);
    }
    equals(pitchIn: object) {
        return super.equals(pitchIn)
                && isPitch(pitchIn)
                && this.octave === pitchIn.octave;
    }
    getInterval(pitchIn: TPitch) {
        if (!isPitch(pitchIn)) throw new TypeError("Cannot get Interval with other object than Pitch");
        const that = pitchIn instanceof Pitch ? pitchIn : new Pitch(pitchIn);
        const degree = that.enumNote.index - this.enumNote.index + 1 + (pitchIn.octave - this.octave) * 7;
        const onset = that.offset - this.offset - Interval.getOffsetFromDegree(degree);
        const octave = 0;
        return new Interval(degree, onset, octave);
    }
    get offset() {
        return this.enumNote.offset + this.alteration + 12 * (this.octave + 1);
    }
    static fromArray(...arrayIn: (string | number | TPitch)[]) {
        return arrayIn.map(e => new Pitch(e as any));
    }
    toString() {
        return super.toString() + this.octave;
    }
    clone(): Pitch {
        return new Pitch(this);
    }
    static compare(x: Pitch, y: Pitch) {
        return x.offset - y.offset;
    }
}
