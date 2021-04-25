import { Midi } from "@tonejs/midi";
import TrackNote, { isTrackNoteArray } from "./TrackNote";
import Effect, { isEffectArray } from "../effect/Effect";
import Automation, { isAutomationArray } from "../effect/Automation";
import { isTypeofInstrument, TConcreteInstrument } from "../instrument/Instrument";

export interface ITrack {
    name: string;
    instrument?: TConcreteInstrument;
    notes: TrackNote[];
    effects: Effect[];
    automations: Automation[];
    output: Track;
}
export const isTrack = (x: any): x is ITrack => {
    return x instanceof Track
        || (typeof x === "object"
        && typeof x.name === "string"
        && (typeof x.instrument === "undefined" || isTypeofInstrument(x.instrument))
        && isTrackNoteArray(x.notes)
        && isEffectArray(x.effects)
        && isAutomationArray(x.automations)
        && isTrack(x.output));
};
export class Track implements ITrack {
    static readonly isTrack = isTrack;

    name: string;
    instrument?: TConcreteInstrument;
    notes: TrackNote[];
    effects: Effect[];
    automations: Automation[];
    output: Track;
    toMidi(bpm = 60) {
        const midi = new Midi();
        midi.header.setTempo(bpm);
        const track = midi.addTrack();
        this.notes.forEach((note) => {
            track.addNote({
                midi: ~~note.pitch.offset,
                ticks: note.offset.getTicks(bpm),
                durationTicks: note.duration.getTicks(bpm)
            });
        });
        return midi.toArray();
    }
}

export default Track;
