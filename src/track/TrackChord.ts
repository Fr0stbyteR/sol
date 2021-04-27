import { Midi } from "@tonejs/midi";
import Pitch from "../Pitch";
import Chord, { isChord } from "../Chord";
import Velocity, { isVelocity } from "../Velocity";
import Duration, { isDuration } from "../Duration";
import Articulation, { isArticulation } from "../Articulation";

export interface ITrackChord {
    duration: Duration;
    offset: Duration;
    chord?: Chord;
    velocity?: Velocity;
    articulation?: Articulation;
}
export const isTrackChord = (x: any): x is ITrackChord => {
    return x instanceof TrackChord
        || (typeof x === "object"
        && isDuration(x.duration)
        && isDuration(x.offset)
        && (typeof x.chord === "undefined" || isChord(x.chord))
        && (typeof x.velocity === "undefined" || isVelocity(x.velocity))
        && (typeof x.articulation === "undefined" || isArticulation(x.articulation)));
};
export const isTrackChordArray = (x: any): x is TrackChord[] => {
    return Array.isArray(x)
        && x.every(el => el instanceof TrackChord);
};
export class TrackChord implements ITrackChord {
    static readonly isTrackChord = isTrackChord;
    static readonly isTrackChordArray = isTrackChordArray;

    duration: Duration;
    offset: Duration;
    chord?: Chord;
    velocity?: Velocity;
    articulation?: Articulation;
    constructor(optionsIn: ITrackChord) {
        this.duration = optionsIn.duration.clone();
        this.offset = optionsIn.offset.clone();
        this.chord = optionsIn.chord?.clone().toAbsolute();
        this.velocity = optionsIn.velocity?.clone();
        this.articulation = optionsIn.articulation?.clone();
        return this;
    }
    clone() {
        return new TrackChord(this);
    }
    toMidi(bpm = 60) {
        const midi = new Midi();
        midi.header.setTempo(bpm);
        const track = midi.addTrack();
        const ticks = this.offset.getTicks(bpm);
        const durationTicks = this.duration.getTicks(bpm);
        this.chord.notes.forEach((pitch: Pitch) => {
            track.addNote({
                midi: ~~pitch.offset,
                ticks,
                durationTicks
            });
        });
        return midi.toArray();
    }
    toString() {
        return `${this.offset} -> ${this.chord ? this.chord.toString() : "*"} ${this.duration}`;
    }
}

export default TrackChord;
