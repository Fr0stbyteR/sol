import { Instrument } from "./Instrument";
import { Pitch } from "../Pitch";
import { KICK, DRUM, PERCUSSION, UNPITCHED, HAS_RANGE } from "./EnumInstrumentTag";

export class BassDrum extends Instrument {
    static NAME = "Bass Drum";
    static MIN_PITCH = Pitch.MINIMUM;
    static MAX_PITCH = Pitch.fromFrequency(100);
    static TAGS = [KICK, DRUM, PERCUSSION, UNPITCHED, HAS_RANGE];
}
