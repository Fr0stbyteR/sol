import { Instrument } from "./Instrument";
import { PITCHED, ACOUSTIC, SFX } from "./EnumInstrumentTag";

export class Waterdrop extends Instrument {
    static NAME = "Waterdrop";
    static TAGS = [PITCHED, ACOUSTIC, SFX]
}
