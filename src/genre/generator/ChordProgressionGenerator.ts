import { Generator } from "./Generator";
import { Random } from "../Random";
import { Chord } from "../../Chord";

export interface IChordProgressionGeneratorParams {
    stability: number;
    complexity: number;
    baseChord: Chord;
}
export abstract class ChordProgressionGenerator extends Generator {
    static use(randomIn: Random, params: IChordProgressionGeneratorParams) {
        return super.use(randomIn, params);
    }
}
