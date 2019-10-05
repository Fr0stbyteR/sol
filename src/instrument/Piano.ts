import { Instrument } from "./Instrument";
import { Pitch } from "../Pitch";
import { PITCHED, KEYBOARD, HAS_RANGE, ACOUSTIC } from "./EnumInstrumentTag";

export class Piano extends Instrument {
    static NAME = "Piano";
    static MIN_PITCH = new Pitch("A0");
    static MAX_PITCH = new Pitch("C9");
    static TAGS = [PITCHED, KEYBOARD, HAS_RANGE, ACOUSTIC];
}
