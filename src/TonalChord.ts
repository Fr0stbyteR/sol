import Chord, { EnumChord } from "./Chord";
import { parseRoman, toRoman } from "./utils";
import Tonality from "./Tonality";
import Interval from "./Interval";

export interface ITonalChord {
    alteration: number;
    degree: number;
    chord: EnumChord;
}
export const isTonalChord = (x: any): x is ITonalChord => {
    return x instanceof TonalChord
        || (typeof x.alteration === "number"
        && typeof x.degree === "number"
        && x.chord instanceof EnumChord);
};
export const isTonalChordArray = (x: any): x is TonalChord[] => {
    return Array.isArray(x)
        && x.every(e => e instanceof TonalChord);
};
export class TonalChord implements ITonalChord {
    static REGEX1 = /^([#b]?)(I{1,3}|i{1,3}|I?V|i?v|VI{1,2}|vi{1,2})(\+|-?)$/;
    static REGEX2 = /^([#b]?)([1-7])(M|m|\+|-?)$/;
    alteration: number;
    degree: number;
    chord: EnumChord;
    constructor(nameIn: string);
    constructor(chordIn: ITonalChord);
    constructor(first: string | ITonalChord) {
        if (typeof first === "string") {
            let matched = TonalChord.REGEX1.exec(first);
            if (matched) {
                let s = matched[1];
                this.alteration = s === "#" ? 1 : s === "b" ? -1 : 0;
                s = matched[2];
                const p = parseRoman(s);
                if (p !== 0 && p > 7 && p < -7) throw new Error("Roman number too large for degree.");
                this.degree = Math.abs(p);
                s = matched[3];
                this.chord = s.length === 0
                    ? p > 0 ? EnumChord.MAJ : EnumChord.MIN
                    : s === "+" ? EnumChord.AUG : EnumChord.DIM;
            } else {
                matched = TonalChord.REGEX2.exec(first);
                if (matched) {
                    let s = matched[1];
                    this.alteration = s === "#" ? 1 : s === "b" ? -1 : 0;
                    s = matched[2];
                    this.degree = +s;
                    s = matched[3];
                    this.chord = s.length === 0
                        ? null
                        : s === "M" ? EnumChord.MAJ
                            : s === "m" ? EnumChord.MAJ
                                : s === "+" ? EnumChord.AUG
                                    : EnumChord.DIM;
                } else throw new Error("Input string error: " + first);
            }
        } else {
            this.alteration = first.alteration;
            this.degree = first.degree;
            this.chord = first.chord.clone();
        }
    }
    getChord(tonalityIn: Tonality) {
        let chord: Chord;
        if (this.chord) chord = new Chord(tonalityIn.getNoteFromDegree(this.degree));
        else chord = tonalityIn.getTriad(this.degree);
        if (this.alteration === 1) chord.base.add(new Interval("A1"));
        else if (this.alteration === -1) chord.base.sub(new Interval("A1"));
        return chord;
    }
    equals(chordIn: object) {
        return isTonalChord(chordIn)
            && chordIn.alteration === this.alteration
            && chordIn.degree === this.degree
            && chordIn.chord.equals(this.chord);
    }
    toString() {
        let s = "";
        if (this.alteration === 1) s = "#";
        else if (this.alteration === -1) s = "b";
        if (!this.chord) return s + this.degree;
        s += toRoman(this.degree * (this.chord.equals(EnumChord.MIN) ? -1 : 1));
        if (!this.chord.equals(EnumChord.MAJ) && !this.chord.equals(EnumChord.MIN)) {
            if (this.chord.equals(EnumChord.AUG)) s += "+";
            else if (this.chord.equals(EnumChord.AUG)) s += "-";
            else s += this.chord.name().toLowerCase();
        }
        return s;
    }
    clone() {
        return new TonalChord(this);
    }
}

export default TonalChord;
