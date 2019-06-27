export interface ITimeCode {
    beats: number;
    beatDuration: number;
    bpm: number;
}
export const isTimeCode = (x: any): x is ITimeCode => {
    return x instanceof TimeCode
        || (typeof x.beats === "number"
        && typeof x.beatDuration === "number"
        && typeof x.bpm === "number");
};
export class TimeCode implements ITimeCode {
    static DEFAULT = new TimeCode(4, 4, 60);

    beats: number;
    beatDuration: number;
    bpm: number;
    constructor(beatsIn?: number, beatDurationIn?: number, bpmIn?: number);
    constructor(timeCodeIn: ITimeCode);
    constructor(first?: number | ITimeCode, second?: number, third?: number) {
        if (isTimeCode(first)) {
            this.beats = first.beats;
            this.beatDuration = first.beatDuration;
            this.bpm = first.bpm;
        } else {
            this.beats = first || 4;
            this.beatDuration = second || 4;
            this.bpm = third || 60;
        }
    }

    getAbsoluteDuration(beatsIn?: number) {
        return (typeof beatsIn === "number" ? beatsIn : 1) * this.bpm / 60;
    }

    toString() {
        return this.beats + "/" + this.beatDuration + " @" + this.bpm;
    }

    clone() {
        return new TimeCode(this);
    }
}
