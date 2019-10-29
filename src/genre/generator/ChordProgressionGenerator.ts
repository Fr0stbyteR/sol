import { Generator } from "./Generator";
import { Random } from "../Random";

export abstract class ChordProgressionGenerator extends Generator {
    static use(randomIn: Random, params: { stablity: number }) {
        return super.use(randomIn, params);
    }
}
