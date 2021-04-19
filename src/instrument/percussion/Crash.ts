import Cymbal from "./Cymbal";
import Pitch from "../../Pitch";
import { CRASH } from "../EnumInstrumentTag";

export class Crash extends Cymbal {
    static NAME = "Crash";
    static MIN_PITCH = Pitch.fromFrequency(300); // https://www.musical-u.com/learn/percussion-frequencies-part-2-cymbals/
    static MAX_PITCH = Pitch.fromFrequency(12000);
    static TAGS = [CRASH, ...Cymbal.TAGS];
}

export default Crash;
