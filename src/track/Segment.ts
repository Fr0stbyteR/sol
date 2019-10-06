import { isTypeofInstrument, TConcreteInstrument } from "../instrument/Instrument";
import { TrackNote, isTrackNoteArray } from "./TrackNote";
import { Automation, isAutomationArray } from "../effect/Automation";
import { Duration, isDuration } from "../Duration";

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
        return this;
    }
    get noteDurations() {
        return this.notes.map(note => note.duration);
    }
    get noteOffsets() {
        return this.notes.map(note => note.offset);
    }
    clone() {
        return new Segment(this);
    }
}
