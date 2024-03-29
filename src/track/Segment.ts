import { isTrackChordArray, ITrackChord } from "./TrackChord";
import Automation, { IAutomation, isAutomationArray } from "../effect/Automation";
import Duration, { IDuration, isDuration } from "../Duration";
import Chord from "../Chord";
import Velocity from "../Velocity";
import { isObjectArray } from "../utils";
import TimeCode, { ITimeCode } from "../TimeCode";
import Sequence from "./Sequence";

export interface ISegment {
    trackChords: ITrackChord[];
    automations: IAutomation[];
    duration: IDuration;
}
export const isSegment = (x: any): x is ISegment => {
    return x instanceof Segment
        || (typeof x === "object"
        && x !== null
        && isTrackChordArray(x.trackChords)
        && isAutomationArray(x.automations)
        && isDuration(x.duration));
};
export const isSegmentArray = (x: any): x is ISegment[] => {
    return isObjectArray(x, isSegment);
};
export class Segment implements ISegment {
    static readonly isSegment = isSegment;
    static readonly isSegmentArray = isSegmentArray;

    trackChords: Sequence;
    automations: Automation[];
    duration: Duration;
    constructor(optionsIn: ISegment) {
        this.trackChords = Sequence.fromArrays(optionsIn.trackChords);
        this.automations = Automation.fromArray(optionsIn.automations);
        this.duration = new Duration(optionsIn.duration);
    }
    getChords() {
        return this.trackChords.map(trackChord => trackChord.getChord());
    }
    setChords(chordsIn: Chord[], velocitiesIn?: Velocity[][] | number[][]) {
        chordsIn.forEach((e, i) => {
            const trackChord = this.trackChords[i];
            trackChord.setChord(e, velocitiesIn?.[i]);
        });
    }
    get noteDurations() {
        return this.trackChords.map(note => note.duration);
    }
    set noteDurations(durationsIn: Duration[]) {
        durationsIn.forEach((e, i) => {
            const trackNote = this.trackChords[i];
            if (trackNote) trackNote.duration = e.clone();
        });
    }
    get noteOffsets() {
        return this.trackChords.map(note => note.offset);
    }
    set noteOffsets(offsetsIn: Duration[]) {
        offsetsIn.forEach((e, i) => {
            const trackNote = this.trackChords[i];
            if (trackNote) trackNote.offset = e.clone();
        });
    }
    clone() {
        return new Segment(this);
    }
    toMidi({ bpm, beats, beatDuration }: ITimeCode = new TimeCode(4, 4, 60)) {
        return this.trackChords.toMidi({ bpm, beats, beatDuration });
    }
}

export default Segment;
