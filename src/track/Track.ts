import { Midi } from "@tonejs/midi";
import TrackChord, { isTrackChordArray } from "./TrackChord";
import Effect, { isEffectArray } from "../effect/Effect";
import Automation, { isAutomationArray } from "../effect/Automation";
import { isTypeofInstrument, TConcreteInstrument } from "../instrument/Instrument";
import Pitch from "../Pitch";

export interface ITrack {
    name: string;
    Instrument?: TConcreteInstrument;
    trackChords: TrackChord[];
    effects: Effect[];
    automations: Automation[];
    output: Track;
}
export const isTrack = (x: any): x is ITrack => {
    return x instanceof Track
        || (typeof x === "object"
        && typeof x.name === "string"
        && (typeof x.Instrument === "undefined" || isTypeofInstrument(x.Instrument))
        && isTrackChordArray(x.trackChords)
        && isEffectArray(x.effects)
        && isAutomationArray(x.automations)
        && isTrack(x.output));
};
export class Track implements ITrack {
    static readonly isTrack = isTrack;

    name: string;
    Instrument?: TConcreteInstrument;
    trackChords: TrackChord[];
    effects: Effect[];
    automations: Automation[];
    output: Track;
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

export default Track;
