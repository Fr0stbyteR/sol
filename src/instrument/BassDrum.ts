import { Instrument } from "./Instrument";
import { Pitch } from "../Pitch";
import { Frequency } from "../Frequency";
import { KICK, DRUM, PERCUSSION, UNPITCHED, HAS_RANGE } from "./EnumInstrumentTag";

export class BassDrum extends Instrument {
    static NAME = "Bass Drum";
    static MIN_PITCH = Pitch.MINIMUM;
    static MAX_PITCH = Frequency.toPitch(100);
    static TAGS = [KICK, DRUM, PERCUSSION, UNPITCHED, HAS_RANGE];
}
