import { Interval, isIntervalArray } from "./Interval";
import { Note, isNoteArray, isNote } from "./Note";
import { Pitch, isPitchArray } from "./Pitch";

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
