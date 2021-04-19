import Cymbal from "./Cymbal";
import Pitch from "../../Pitch";
import { RIDE } from "../EnumInstrumentTag";

export class Ride extends Cymbal {
    static NAME = "Ride";
    static MIN_PITCH = Pitch.fromFrequency(300); // https://www.musical-u.com/learn/percussion-frequencies-part-2-cymbals/
    static MAX_PITCH = Pitch.fromFrequency(6000);
    static TAGS = [RIDE, ...Cymbal.TAGS];
}

export default Ride;
