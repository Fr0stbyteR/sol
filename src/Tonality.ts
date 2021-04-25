import Scale, { isScale, EnumScale } from "./Scale";
import Note, { isNote } from "./Note";
import Chord from "./Chord";
import Interval from "./Interval";

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
export class Tonality implements Iterable<Note>, ITonality, IClonable<Tonality> {
    static readonly isTonality = isTonality;

    note: Note;
    scale: Scale;
    constructor(tonalityIn: Tonality);
    constructor(tonalityIn: string);
    constructor(noteIn: Note, scaleIn: Scale);
    constructor(p1: Tonality | string | Note, p2?: Scale) {
        this.become(p1, p2);
    }
    become(p1: Tonality | string | Note, p2?: Scale) {
        if (isTonality(p1)) {
            this.note = p1.note.clone();
            this.scale = p1.scale.clone();
        } else if (typeof p1 === "string") {
            try {
                this.note = new Note(p1);
            } catch (e) {
                throw new Error(`No such tonality: ${p1}.`);
            }
            this.scale = p1.substr(p1.length - 1).match("[A-G]") ? EnumScale.MAJOR : EnumScale.MINOR;
        } else {
            this.note = p1;
            this.scale = p2;
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
    getNoteFromDegree(degreeIn: number) {
        return this.note.clone().add(this.scale.getIntervalFromDegree(degreeIn));
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
    * [Symbol.iterator](): Iterator<Note> {
        for (let i = 0; i < this.scale.size; i++) {
            yield this.note.clone().add(this.scale.intervals[i]);
        }
    }
}

export default Tonality;
