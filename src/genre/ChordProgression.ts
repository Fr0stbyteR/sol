import TonalChord, { isTonalChord, isTonalChordArray } from "../TonalChord";
import { isStringArray } from "../utils";
import Tonality from "../Tonality";
import EnumChordProgression from "./EnumChordProgression";

export interface IChordProgression {
    chords: TonalChord[];
}
export const isChordProgression = (x: any): x is IChordProgression => {
    return x instanceof ChordProgression
        || (typeof x === "object"
        && isTonalChord(x.chord));
};
export class ChordProgression implements Iterable<TonalChord>, IChordProgression {
    static readonly isChordProgression = isChordProgression;
    static readonly EnumChordProgression = EnumChordProgression;

    chords: TonalChord[];
    constructor(cp: string);
    constructor(cp: string[]);
    constructor(c: TonalChord);
    constructor(cp: TonalChord[]);
    constructor(cp: IChordProgression);
    constructor(p1: string | string[] | TonalChord | TonalChord[] | IChordProgression) {
        this.chords = this.from(p1);
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
    from(p1: string | string[] | TonalChord | TonalChord[] | IChordProgression) {
        if (typeof p1 === "string") return this.fromString(p1);
        if (isStringArray(p1)) return this.fromStringArray(p1);
        if (isTonalChord(p1)) return [p1.clone()];
        if (isTonalChordArray(p1)) return p1.map(c => c.clone());
        return p1.chords.map(c => c.clone());
    }
    append(p1: string | string[] | TonalChord | TonalChord[] | IChordProgression) {
        this.chords.concat(this.from(p1));
        return this;
    }
    prepend(p1: string | string[] | TonalChord | TonalChord[] | IChordProgression) {
        this.chords = this.from(p1).concat(this.chords);
        return this;
    }
    toString() {
        return `ChordProgression: {${this.chords.map(tc => tc.toString()).join(" ")}}`;
    }
    clone() {
        return new ChordProgression(this);
    }
    * [Symbol.iterator](): Iterator<TonalChord> {
        for (const chord of this.chords) {
            yield chord;
        }
    }
}

export default ChordProgression;
