import Instrument from "../Instrument";
import Pitch from "../../Pitch";
import { PERCUSSION, HAS_RANGE, TOM, PITCHED, DRUM } from "../EnumInstrumentTag";

export class Tom extends Instrument {
    static NAME = "Tom";
    static MIN_PITCH = Pitch.fromFrequency(80); // https://www.audio-issues.com/music-mixing/get-a-thundering-tom-sound-in-3-easy-steps/
    static MAX_PITCH = Pitch.fromFrequency(300);
    static TAGS = [TOM, DRUM, PERCUSSION, PITCHED, HAS_RANGE];
}

export default Tom;
