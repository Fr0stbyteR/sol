import { Instrument } from "../Instrument";
import { DRUM, PERCUSSION, UNPITCHED, HAS_RANGE, CLAP } from "../EnumInstrumentTag";

export class Clap extends Instrument {
    static NAME = "Shake";
    static TAGS = [CLAP, DRUM, PERCUSSION, UNPITCHED, HAS_RANGE];
}
