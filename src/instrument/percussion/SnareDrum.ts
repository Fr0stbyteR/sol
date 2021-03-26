import Instrument from "../Instrument";
import { DRUM, PERCUSSION, UNPITCHED, HAS_RANGE, SNARE } from "../EnumInstrumentTag";
import Pitch from "../../Pitch";

export class SnareDrum extends Instrument { // https://i.pinimg.com/originals/b7/48/32/b748327e97b5ee3fd95438401a509896.jpg
    static NAME = "Snare Drum";
    static MIN_PITCH = Pitch.fromFrequency(300);
    static MAX_PITCH = Pitch.fromFrequency(6000);
    static TAGS = [SNARE, DRUM, PERCUSSION, UNPITCHED, HAS_RANGE];
}

export default SnareDrum;
