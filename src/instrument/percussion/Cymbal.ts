import Instrument from "../Instrument";
import Pitch from "../../Pitch";
import { PERCUSSION, UNPITCHED, HAS_RANGE, CYMBAL } from "../EnumInstrumentTag";

export class Cymbal extends Instrument {
    static NAME = "Cymbal";
    static MIN_PITCH = Pitch.fromFrequency(300); // https://www.musical-u.com/learn/percussion-frequencies-part-2-cymbals/
    static MAX_PITCH = Pitch.fromFrequency(12000);
    static TAGS = [CYMBAL, PERCUSSION, UNPITCHED, HAS_RANGE];
}

export default Cymbal;
