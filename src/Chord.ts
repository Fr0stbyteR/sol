import { Interval, isIntervalArray } from "./Interval";
import { Note, isNoteArray } from "./Note";
import { Pitch, isPitchArray } from "./Pitch";

export type TChord = { base: Note | Pitch; intervals: Interval[]; isAbsolute: boolean };

export class Chord implements Iterable<Note> {
    base: Note | Pitch;
    intervals: Interval[]; // Intervals from base
    isAbsolute: boolean;
    /**
     * Creates an instance of Chord from a base note and notes or intervals (strings as intervals)
     * @param {(Note | Pitch | string)} baseIn
     * @param {(...Note[] | Pitch[] | Interval[] | string[])} arrayIn
     * @memberof Chord
     */
    constructor(baseIn: Note | Pitch | string, ...arrayIn: Note[] | Pitch[] | Interval[] | string[]) {
        this.base = null;
        this.intervals = [];
        this.isAbsolute = false;
        if (typeof baseIn === "string") {
            const isPitch = Pitch.REGEX.exec(baseIn);
            if (isPitch) this.base = new Pitch(baseIn);
            else this.base = new Note(baseIn);
        } else {
            this.base = baseIn;
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
    toString() {
        return this.base.toString() + ":" + this.intervals.toString();
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
