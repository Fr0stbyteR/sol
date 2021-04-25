import { Midi } from "@tonejs/midi";
import Pitch, { isPitch } from "../Pitch";
import Velocity, { isVelocity } from "../Velocity";
import Duration, { isDuration } from "../Duration";
import Articulation, { isArticulation } from "../Articulation";

export interface ITrackNote {
    duration: Duration;
    offset: Duration;
    pitch?: Pitch;
    velocity?: Velocity;
    articulation?: Articulation;
}
export const isTrackNote = (x: any): x is ITrackNote => {
    return x instanceof TrackNote
        || (typeof x === "object"
        && isDuration(x.duration)
        && isDuration(x.offset)
        && (typeof x.pitch === "undefined" || isPitch(x.pitch))
        && (typeof x.velocity === "undefined" || isVelocity(x.velocity))
        && (typeof x.articulation === "undefined" || isArticulation(x.articulation)));
};
export const isTrackNoteArray = (x: any): x is TrackNote[] => {
    return Array.isArray(x)
        && x.every(el => el instanceof TrackNote);
};
export class TrackNote implements ITrackNote {
    static readonly isTrackNote = isTrackNote;
    static readonly isTrackNoteArray = isTrackNoteArray;

    duration: Duration;
    offset: Duration;
    pitch?: Pitch;
    velocity?: Velocity;
    articulation?: Articulation;
    constructor(optionsIn: ITrackNote) {
        this.duration = optionsIn.duration.clone();
        this.offset = optionsIn.offset.clone();
        this.pitch = optionsIn.pitch?.clone();
        this.velocity = optionsIn.velocity?.clone();
        this.articulation = optionsIn.articulation?.clone();
        return this;
    }
    clone() {
        return new TrackNote(this);
    }
    toMidi(bpm = 60) {
        const midi = new Midi();
        midi.header.setTempo(bpm);
        const track = midi.addTrack();
        track.addNote({
            midi: ~~this.pitch.offset,
            ticks: this.offset.getTicks(bpm),
            durationTicks: this.duration.getTicks(bpm)
        });
        return midi.toArray();
    }
    toString() {
        return `${this.offset} -> ${this.pitch ? this.pitch.toString() : "*"} ${this.duration}`;
    }
}

export default TrackNote;
