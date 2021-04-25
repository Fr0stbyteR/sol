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
    static readonly DEFAULT = new TimeCode(4, 4, 60);
    static readonly isTimeCode = isTimeCode;

    beats: number;
    beatDuration: number;
    bpm: number;
    constructor(beatsIn?: number, beatDurationIn?: number, bpmIn?: number);
    constructor(timeCodeIn: ITimeCode);
    constructor(p1?: number | ITimeCode, p2?: number, p3?: number) {
        if (isTimeCode(p1)) {
            this.beats = p1.beats;
            this.beatDuration = p1.beatDuration;
            this.bpm = p1.bpm;
        } else {
            this.beats = p1 || 4;
            this.beatDuration = p2 || 4;
            this.bpm = p3 || 60;
        }
    }

    getSecondsFromBeats(beatsIn = 1) {
        return beatsIn * 60 / this.bpm;
    }

    getBeatsFromSeconds(secondsIn = 1) {
        return secondsIn * this.bpm / 60;
    }

    toString() {
        return this.beats + "/" + this.beatDuration + " @" + this.bpm;
    }

    clone() {
        return new TimeCode(this);
    }
}

export default TimeCode;
