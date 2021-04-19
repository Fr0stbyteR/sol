import Cymbal from "./Cymbal";
import Pitch from "../../Pitch";
import { HAT } from "../EnumInstrumentTag";

export class HiHat extends Cymbal {
    static NAME = "Hi-Hat";
    static MIN_PITCH = Pitch.fromFrequency(300); // https://www.musical-u.com/learn/percussion-frequencies-part-2-cymbals/
    static MAX_PITCH = Pitch.fromFrequency(3000);
    static TAGS = [HAT, ...Cymbal.TAGS];
}

export default HiHat;
