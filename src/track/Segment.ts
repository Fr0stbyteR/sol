import { Midi } from "@tonejs/midi";
import { isTypeofInstrument, TConcreteInstrument } from "../instrument/Instrument";
import TrackChord, { isTrackChordArray } from "./TrackChord";
import Automation, { isAutomationArray } from "../effect/Automation";
import Duration, { isDuration } from "../Duration";
import Chord from "../Chord";
import Pitch from "../Pitch";

export interface ISegment {
    Instrument?: TConcreteInstrument;
    trackChords: TrackChord[];
    automations: Automation[];
    duration: Duration;
}
export const isSegment = (x: any): x is ISegment => {
    return x instanceof Segment
        || (typeof x === "object"
        && (typeof x.Instrument === "undefined" || isTypeofInstrument(x.Instrument))
        && isTrackChordArray(x.trackChords)
        && isAutomationArray(x.automations)
        && isDuration(x.duration));
};
export const isSegmentArray = (x: any): x is ISegment[] => {
    return Array.isArray(x)
        && x.every(e => e instanceof Segment);
};
export class Segment implements ISegment {
    static readonly isSegment = isSegment;
    static readonly isSegmentArray = isSegmentArray;

    Instrument?: TConcreteInstrument;
    trackChords: TrackChord[];
    automations: Automation[];
    duration: Duration;
    constructor(optionsIn: ISegment) {
        this.Instrument = optionsIn.Instrument;
        this.trackChords = optionsIn.trackChords.map(e => e.clone());
        this.automations = optionsIn.automations.map(e => e.clone());
        this.duration = optionsIn.duration.clone();
    }
    get chords() {
        return this.trackChords.map(trackChord => trackChord.chord);
    }
    set chords(chordsIn: Chord[]) {
        chordsIn.forEach((e, i) => {
            const trackNote = this.trackChords[i];
            if (trackNote) trackNote.chord = e.clone().toAbsolute();
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
    toMidi(bpm = 60) {
        const midi = new Midi();
        midi.header.setTempo(bpm);
        const track = midi.addTrack();
        this.trackChords.forEach((trackChord) => {
            const ticks = trackChord.offset.getTicks(bpm);
            const durationTicks = trackChord.duration.getTicks(bpm);
            trackChord.chord.notes.forEach((pitch: Pitch) => {
                track.addNote({
                    midi: ~~pitch.offset,
                    ticks,
                    durationTicks
                });
            });
        });
        return midi.toArray();
    }
}

export default Segment;
