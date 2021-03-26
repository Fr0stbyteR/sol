import Duration, { isDuration } from "../Duration";
import TonalChord, { isTonalChord } from "../TonalChord";

export interface ITrackChord {
    duration: Duration;
    offset: Duration;
    chord: TonalChord;
}
export const isTrackChord = (x: any): x is ITrackChord => {
    return x instanceof TrackChord
        || (typeof x === "object"
        && isDuration(x.duration)
        && isDuration(x.offset)
        && isTonalChord(x.chord));
};
export class TrackChord implements ITrackChord {
    duration: Duration;
    offset: Duration;
    chord: TonalChord;
    constructor(trackChordIn: ITrackChord) {
        this.duration = trackChordIn.duration.clone();
        this.offset = trackChordIn.offset.clone();
        this.chord = trackChordIn.chord.clone();
    }
    clone() {
        return new TrackChord(this);
    }
}

export default TrackChord;
