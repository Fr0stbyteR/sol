import { ChordProgressionGenre, isChordProgressionGenre } from "./ChordProgressionGenre";
import { Tonality } from "../Tonality";
import { ChordProgression } from "./ChordProgression";
import { Part } from "./form/Part";
import { Form } from "./form/Form";

export interface IGenre {
    name: string;
    chordProgressionGenre: ChordProgressionGenre;
    getChordProgression: (tonalityIn: Tonality) => ChordProgression;
    getParts: () => Record<string, Part>;
    getForm: () => Form;
}
export const isGenre = (x: any): x is IGenre => {
    return x instanceof Genre
        || (typeof x.name === "string"
        && isChordProgressionGenre(x.chordProgressionGenre)
        && typeof x.getChordProgression === "function"
        && typeof x.getParts === "function"
        && typeof x.getForm === "function");
};
export class Genre implements IGenre {
    name: string;
    chordProgressionGenre: ChordProgressionGenre;
    getChordProgression: (tonalityIn: Tonality) => ChordProgression;
    getParts: () => Record<string, Part>;
    getForm: () => Form;
    constructor(optionsIn: IGenre) {
        Object.assign(this, optionsIn);
        return this;
    }
}
