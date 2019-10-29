export class Frequency {
    static A440 = 440;
    static SEMITONE = 2 ** (1 / 12);
    static THRES_AUDIT = 2 ** (1 / 36);
    static getRatio = (d: number) => 2 ** (d / 12);
}
