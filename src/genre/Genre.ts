import { ChordProgressionGenre } from "./ChordProgressionGenre";
import { Tonality } from "../Tonality";
import { ChordProgression } from "./ChordProgression";

export abstract class Genre {
    chordProgressionGenre: ChordProgressionGenre;
    abstract getChordProgression(tonalityIn: Tonality): ChordProgression;
}
