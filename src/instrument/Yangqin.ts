import { Instrument } from "./Instrument";
import { Pitch } from "../Pitch";
import { PITCHED, STRING, PLUCKED, HAS_RANGE, ACOUSTIC } from "./EnumInstrumentTag";

export class Yangqin extends Instrument {
    static NAME = "Yangqin";
    static MIN_PITCH = new Pitch("E2");
    static MAX_PITCH = new Pitch("e7");
    static TAGS = [PITCHED, STRING, PLUCKED, HAS_RANGE, ACOUSTIC];
}
