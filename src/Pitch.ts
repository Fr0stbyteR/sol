import { Note, EnumNote, INote, isNote } from "./Note";
import { Interval } from "./Interval";
import { Frequency } from "./Frequency";

export interface IPitch extends INote {
    octave: number;
}
export const isPitch = (x: any): x is IPitch => {
    return x instanceof Pitch
        || (typeof x === "object"
        && x.enumNote instanceof EnumNote
        && typeof x.alteration === "number"
        && typeof x.octave === "number");
};
export const isPitchArray = (x: any): x is Pitch[] => {
    return Array.isArray(x)
        && x.every(el => el instanceof Pitch);
};
export class Pitch extends Note implements IPitch, IComputable<Pitch> {
    static REGEX = /^([b#]*[a-gA-G])(-?\d+)?$/;
    static fromFrequency(f: number) {
        return new Pitch(69 + 12 * (Math.log(f / Frequency.A440) / Math.log(2)));
    }
    static MINIMUM = Pitch.fromFrequency(20);
    static MAXIMUM = Pitch.fromFrequency(20000);
    octave: number;

    /**
     * Returns C0
     * @memberof Pitch
     */
    constructor();
    /**
     * Gives a new Pitch instance (clone)
     * @param {IPitch} pitchIn
     * @memberof Pitch
     */
    constructor(pitchIn: IPitch);
    /**
     * Add octave info to a note
     * @param {EnumNote | INote} noteIn
     * @param {number} [octaveIn]
     * @memberof Pitch
     */
    constructor(noteIn: EnumNote | INote, octaveIn?: number);
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
    constructor(first?: IPitch | EnumNote | INote | string | number, second?: number) {
        if (isPitch(first)) {
            super(first);
            this.octave = first.octave;
        } else if (first instanceof EnumNote) {
            super(first);
            this.octave = second || 0;
        } else if (isNote(first)) {
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
    get frequency() {
        return Frequency.A440 * 2 ** ((this.offset - 69) / 12);
    }
    static fromString(nameIn: string): IPitch {
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
    static fromOffset(offsetIn: number): IPitch {
        return { ...super.fromOffset(offsetIn), octave: Math.floor(offsetIn / 12 - 1) };
    }
    protected fromOffset(offsetIn: number) {
        const { enumNote, alteration, octave } = Pitch.fromOffset(offsetIn);
        this.enumNote = enumNote;
        this.alteration = alteration;
        this.octave = octave;
        return this;
    }
    add(semitones: number): Pitch;
    add(interval: string | Interval): Pitch;
    add(pitchIn: Pitch): Pitch;
    add(iIn: number | string | Interval | Pitch) {
        if (typeof iIn === "number") return this.fromOffset(this.offset + iIn);
        if (iIn instanceof Pitch) return this.mul(1 + iIn.frequency / this.frequency);
        let i: Interval;
        if (typeof iIn === "string") i = new Interval(iIn);
        else if (iIn instanceof Interval) i = iIn;
        this.octave += Math.floor((this.enumNote.index + i.degree - 1) / 7) + i.octave;
        return super.add(i);
    }
    static add(a: Pitch, b: Pitch) {
        return a.clone().add(b);
    }
    sub(semitones: number): Pitch;
    sub(interval: string | Interval): Pitch;
    sub(pitchIn: Pitch): Pitch;
    sub(iIn: number | string | Interval | Pitch) {
        if (typeof iIn === "number") return this.fromOffset(this.offset - iIn);
        if (iIn instanceof Pitch) return this.mul(1 - iIn.frequency / this.frequency);
        let i: Interval;
        if (typeof iIn === "string") i = new Interval(iIn);
        else if (iIn instanceof Interval) i = iIn;
        this.octave += Math.floor((this.enumNote.index - i.degree + 1) / 7) - i.octave;
        return super.sub(i);
    }
    static sub(a: Pitch, b: Pitch) {
        return a.clone().sub(b);
    }
    mul(fIn: number): Pitch {
        const d = Note.ratioToOffset(fIn);
        return this.add(d);
    }
    static mul(a: Pitch, b: number) {
        return a.clone().mul(b);
    }
    div(pitchIn: Pitch): number;
    div(fIn: number): Pitch;
    div(first: number | Pitch) {
        if (first instanceof Pitch) return this.frequency / first.frequency;
        return this.mul(1 / first);
    }
    static div(a: Pitch, b: number): Pitch;
    static div(a: Pitch, b: Pitch): number;
    static div(a: Pitch, b: Pitch | number) {
        if (typeof b === "number") return a.clone().div(b);
        return a.clone().div(b);
    }
    equals(pitchIn: object) {
        return super.equals(pitchIn)
            && isPitch(pitchIn)
            && this.octave === pitchIn.octave;
    }
    compareTo(pitchIn: Pitch) {
        return Pitch.compare(this, pitchIn);
    }
    static compare(x: Pitch, y: Pitch) {
        return x.offset - y.offset;
    }
    getInterval(pitchIn: INote) {
        const that = pitchIn instanceof Pitch ? pitchIn : isPitch(pitchIn) ? new Pitch(pitchIn) : new Pitch(pitchIn, this.octave);
        const degree = that.enumNote.index - this.enumNote.index + 1 + (that.octave - this.octave) * 7;
        const onset = that.offset - this.offset - Interval.getOffsetFromDegree(degree);
        const octave = 0;
        return new Interval(degree, onset, octave);
    }
    getDistance(that: Pitch) {
        return Math.abs(this.offset - that.offset);
    }
    get offset() {
        return this.enumNote.offset + this.alteration + 12 * (this.octave + 1);
    }
    static fromArray(...arrayIn: (string | number | IPitch)[]) {
        return arrayIn.map(e => new Pitch(e as any));
    }
    toString() {
        return super.toString() + this.octave;
    }
    clone(): Pitch {
        return new Pitch(this);
    }

    getTendancy(that: Pitch) {
        return super.getTendancy(that);
    }
    getStability(that: Pitch) {
        return super.getStability(that);
    }
}
