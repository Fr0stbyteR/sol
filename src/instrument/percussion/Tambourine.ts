import { Instrument } from "../Instrument";
import { DRUM, PERCUSSION, UNPITCHED, HAS_RANGE, TAMBOURINE } from "../EnumInstrumentTag";

export class Tambourine extends Instrument {
    static NAME = "Tambourine";
    static TAGS = [TAMBOURINE, DRUM, PERCUSSION, UNPITCHED, HAS_RANGE];
}
