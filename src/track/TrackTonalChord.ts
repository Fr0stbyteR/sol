import Duration, { isDuration } from "../Duration";
import TonalChord, { isTonalChord } from "../TonalChord";

export interface ITrackTonalChord {
    duration: Duration;
    offset: Duration;
    chord: TonalChord;
}
export const isTrackTonalChord = (x: any): x is ITrackTonalChord => {
    return x instanceof TrackTonalChord
        || (typeof x === "object"
        && x !== null
        && isDuration(x.duration)
        && isDuration(x.offset)
        && isTonalChord(x.chord));
};
export class TrackTonalChord implements ITrackTonalChord {
    static readonly isTrackTonalChord = isTrackTonalChord;

    duration: Duration;
    offset: Duration;
    chord: TonalChord;
    constructor(trackTonalChordIn: ITrackTonalChord) {
        this.duration = trackTonalChordIn.duration.clone();
        this.offset = trackTonalChordIn.offset.clone();
        this.chord = trackTonalChordIn.chord.clone();
    }
    clone() {
        return new TrackTonalChord(this);
    }
}

export default TrackTonalChord;
