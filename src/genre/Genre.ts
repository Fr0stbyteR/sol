import { ChordProgressionGenre, isChordProgressionGenre } from "./ChordProgressionGenre";
import { Tonality } from "../Tonality";
import { ChordProgression } from "./ChordProgression";
import { Form, Part } from "./form/Part";

export interface IGenre {
    name: string;
    chordProgressionGenre: ChordProgressionGenre;
    getChordProgression: (tonalityIn: Tonality) => ChordProgression;
    getParts: () => { [key: number]: Part };
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
    getParts: () => { [key: number]: Part };
    getForm: () => Form;
    constructor(optionsIn: IGenre) {
        Object.assign(this, optionsIn);
    }
}
