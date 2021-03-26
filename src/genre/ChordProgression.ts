import TonalChord, { isTonalChord, isTonalChordArray } from "../TonalChord";
import { isStringArray } from "../utils";
import Tonality from "../Tonality";

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
    constructor(cp: TonalChord[]);
    constructor(cp: IChordProgression);
    constructor(cp: string | string[] | TonalChord[] | IChordProgression) {
        if (typeof cp === "string") {
            const chords = cp.split(/\s+/);
            this.fromStringArray(chords);
        } else if (isStringArray(cp)) {
            this.fromStringArray(cp);
        } else if (isTonalChordArray(cp)) {
            this.chords = cp.map(c => c.clone());
        } else {
            this.chords = cp.chords.map(c => c.clone());
        }
    }
    getChords(tonalityIn: Tonality) {
        return this.chords.map(c => c.getChord(tonalityIn));
    }
    fromStringArray(chords: string[]) {
        if (chords.length < 2) throw new Error("Input string not enough long.");
        this.chords = chords.map(s => new TonalChord(s));
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

export default ChordProgression;
