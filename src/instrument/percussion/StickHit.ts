import { Instrument } from "../Instrument";
import { DRUM, PERCUSSION, UNPITCHED, HAS_RANGE, STICK } from "../EnumInstrumentTag";

export class StickHit extends Instrument {
    static NAME = "Stick Hit";
    static TAGS = [STICK, DRUM, PERCUSSION, UNPITCHED, HAS_RANGE];
}
