import { Scale, isScale, EnumScale } from "./Scale";
import { Note, isNote } from "./Note";
import { Chord } from "./Chord";
import { Interval } from "./Interval";

export interface ITonality {
    note: Note;
    scale: Scale;
}
export const isTonality = (x: any): x is ITonality => {
    return x instanceof Tonality
        || (typeof x === "object"
        && isNote(x.note)
        && isScale(x.scale));
};
export class Tonality implements Iterable<Note> {
    note: Note;
    scale: Scale;
    constructor(tonalityIn: Tonality);
    constructor(tonalityIn: string);
    constructor(noteIn: Note, scaleIn: Scale);
    constructor(first: Tonality | string | Note, second?: Scale) {
        if (isTonality(first)) {
            this.note = first.note.clone();
            this.scale = first.scale.clone();
        } else if (typeof first === "string") {
            try {
                this.note = new Note(first);
            } catch (e) {
                throw new Error(`No such tonality: ${first}.`);
            }
            this.scale = first.substr(first.length - 1).match("[A-G]") ? EnumScale.MAJOR : EnumScale.MINOR;
        } else {
            this.note = first;
            this.scale = second;
        }
        return this;
    }
    add(intervalIn: Interval) {
        this.note.add(intervalIn);
        return this;
    }
    sub(intervalIn: Interval) {
        this.note.sub(intervalIn);
        return this;
    }

    get notes() {
        return this.scale.intervals.map(i => this.note.clone().add(i));
    }
    getNoteFromDegree(deegreeIn: number) {
        return this.note.clone().add(this.scale.getIntervalFromDegree(deegreeIn));
    }
    getTriad(degreeIn: number) {
        return new Chord(this.getNoteFromDegree(degreeIn), this.getNoteFromDegree(degreeIn + 2), this.getNoteFromDegree(degreeIn + 4));
    }
    getTriads() {
        return this.scale.degrees.map(d => this.getTriad(d));
    }
    get triads() {
        return this.getTriads();
    }
    toRelative() {
        if (this.scale.equals(EnumScale.MAJOR)) {
            this.note.sub(new Interval("m3"));
            this.scale = EnumScale.MINOR;
        } else if (this.scale.equals(EnumScale.MINOR)) {
            this.note.add(new Interval("m3"));
            this.scale = EnumScale.MAJOR;
        } else throw new Error("Relative not found.");
        return this;
    }
    get relative() {
        return this.clone().toRelative();
    }
    toNext() {
        this.note.add(new Interval("P5"));
        return this;
    }
    get next() {
        return this.clone().toNext();
    }
    toPrev() {
        this.note.sub(new Interval("P5"));
        return this;
    }
    get prev() {
        return this.clone().toPrev();
    }
    toString() {
        return `${this.note.toString()} ${this.scale.getName() || this.scale.toString()}`;
    }
    clone() {
        return new Tonality(this);
    }
    [Symbol.iterator](): Iterator<Note> {
        const o = this;
        let i = -1;
        return {
            next() {
                let value: Note;
                let done = true;
                if (i < o.scale.size) {
                    value = o.note.clone().add(o.scale.intervals[i]);
                    i++;
                    done = false;
                }
                return { value, done };
            }
        };
    }
}
