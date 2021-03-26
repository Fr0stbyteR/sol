import Instrument from "../Instrument";
import Pitch from "../../Pitch";
import { PERCUSSION, UNPITCHED, HAS_RANGE, HAT } from "../EnumInstrumentTag";

export class HiHat extends Instrument {
    static NAME = "Hi-Hat";
    static MIN_PITCH = Pitch.fromFrequency(300); // https://www.musical-u.com/learn/percussion-frequencies-part-2-cymbals/
    static MAX_PITCH = Pitch.fromFrequency(3000);
    static TAGS = [HAT, PERCUSSION, UNPITCHED, HAS_RANGE];
}

export default HiHat;
