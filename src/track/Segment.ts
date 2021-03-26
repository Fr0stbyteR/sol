import { isTypeofInstrument, TConcreteInstrument } from "../instrument/Instrument";
import TrackNote, { isTrackNoteArray } from "./TrackNote";
import Automation, { isAutomationArray } from "../effect/Automation";
import Duration, { isDuration } from "../Duration";
import Pitch from "../Pitch";

export interface ISegment {
    instrument?: TConcreteInstrument;
    notes: TrackNote[];
    automations: Automation[];
    duration: Duration;
}
export const isSegment = (x: any): x is ISegment => {
    return x instanceof Segment
        || (typeof x === "object"
        && (typeof x.instrument === "undefined" || isTypeofInstrument(x.instrument))
        && isTrackNoteArray(x.notes)
        && isAutomationArray(x.automations)
        && isDuration(x.duration));
};
export const isSegmentArray = (x: any): x is ISegment[] => {
    return Array.isArray(x)
        && x.every(e => e instanceof Segment);
};
export class Segment implements ISegment {
    instrument?: TConcreteInstrument;
    notes: TrackNote[];
    automations: Automation[];
    duration: Duration;
    constructor(optionsIn: ISegment) {
        this.instrument = optionsIn.instrument;
        this.notes = optionsIn.notes.map(e => e.clone());
        this.automations = optionsIn.automations.map(e => e.clone());
        this.duration = optionsIn.duration.clone();
    }
    get pitches() {
        return this.notes.map(note => note.pitch);
    }
    set pitches(pitchesIn: Pitch[]) {
        pitchesIn.forEach((e, i) => {
            const trackNote = this.notes[i];
            if (trackNote) trackNote.pitch = e.clone();
        });
    }
    get noteDurations() {
        return this.notes.map(note => note.duration);
    }
    set noteDurations(durationsIn: Duration[]) {
        durationsIn.forEach((e, i) => {
            const trackNote = this.notes[i];
            if (trackNote) trackNote.duration = e.clone();
        });
    }
    get noteOffsets() {
        return this.notes.map(note => note.offset);
    }
    set noteOffsets(offsetsIn: Duration[]) {
        offsetsIn.forEach((e, i) => {
            const trackNote = this.notes[i];
            if (trackNote) trackNote.offset = e.clone();
        });
    }
    clone() {
        return new Segment(this);
    }
}

export default Segment;
