import { Pitch } from "./Pitch";

export class Frequency {
    static A440 = 440;
    static SEMITONE = 2 ** (1 / 12);
    static THRES_AUDIT = 2 ** (1 / 36);
    static toPitch(f: number) {
        return new Pitch(69 + 12 * (Math.log(f / Frequency.A440) / Math.log(2)));
    }
}
