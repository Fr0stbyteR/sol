import { TonalChord, isTonalChord, isTonalChordArray } from "../TonalChord";
import { isStringArray } from "../Utils";
import { Tonality } from "../Tonality";

export interface IChordProgression {
    chords: TonalChord[];
}
export const isChordProgression = (x: any): x is IChordProgression => {
    return x instanceof ChordProgression
        || (typeof x === "object"
        && isTonalChord(x.chord));
};
export class ChordProgression implements Iterable<TonalChord>, IChordProgression {
    chords: TonalChord[];
    constructor(cp: string);
    constructor(cp: string[]);
    constructor(c: TonalChord);
    constructor(cp: TonalChord[]);
    constructor(cp: IChordProgression);
    constructor(first: string | string[] | TonalChord | TonalChord[] | IChordProgression) {
        this.chords = this.from(first);
        return this;
    }
    getChords(tonalityIn: Tonality) {
        return this.chords.map(c => c.getChord(tonalityIn));
    }
    fromString(chords: string) {
        return chords.split(/\s+/).map(s => new TonalChord(s));
    }
    fromStringArray(chords: string[]) {
        return chords.map(s => new TonalChord(s));
    }
    from(first: string | string[] | TonalChord | TonalChord[] | IChordProgression) {
        if (typeof first === "string") return this.fromString(first);
        if (isStringArray(first)) return this.fromStringArray(first);
        if (isTonalChord(first)) return [first.clone()];
        if (isTonalChordArray(first)) return first.map(c => c.clone());
        return first.chords.map(c => c.clone());
    }
    append(first: string | string[] | TonalChord | TonalChord[] | IChordProgression) {
        this.chords.concat(this.from(first));
        return this;
    }
    prepend(first: string | string[] | TonalChord | TonalChord[] | IChordProgression) {
        this.chords = this.from(first).concat(this.chords);
        return this;
    }
    toString() {
        return `ChordProgression: {${this.chords.map(tc => tc.toString()).join(" ")}}`;
    }
    clone() {
        return new ChordProgression(this);
    }
    [Symbol.iterator](): Iterator<TonalChord> {
        const o = this;
        let i = -1;
        return {
            next() {
                let value: TonalChord;
                let done = true;
                if (i < o.chords.length) {
                    value = o.chords[i];
                    i++;
                    done = false;
                }
                return { value, done };
            }
        };
    }
}
