import type { GuidoFactoryAdapter } from "@shren/guidolib";
import { Midi } from "@tonejs/midi";
import Duration, { IDuration, isDuration, isDurationAbbreviation, TDurationAbbreviation } from "../Duration";
import Articulation, { IArticulation, isArticulation } from "../Articulation";
import TrackNote, { isTrackNoteArray, ITrackNote } from "./TrackNote";
import { isNumberArray, isObjectArray, isObjectInstanceArrayLike, isObjectInstanceIterable, isStringArray } from "../utils";
import TimeCode, { ITimeCode } from "../TimeCode";
import Chord, { IChord, isChord } from "../Chord";
import Pitch from "../Pitch";
import Velocity, { IVelocity } from "../Velocity";
import Note, { INote, isNoteArray } from "../Note";

export interface ITrackChord {
    duration: IDuration;
    offset: IDuration;
    trackNotes?: ITrackNote[];
    articulation?: IArticulation;
}
export const isTrackChord = (x: any): x is ITrackChord => {
    return x instanceof TrackChord
        || (typeof x === "object"
        && x !== null
        && isDuration(x.duration)
        && isDuration(x.offset)
        && (typeof x.trackNotes === "undefined" || isTrackNoteArray(x.trackNotes))
        && (typeof x.articulation === "undefined" || isArticulation(x.articulation)));
};
export const isTrackChordArray = (x: any): x is ITrackChord[] => {
    return isObjectArray(x, isTrackChord);
};
export const isTrackChordInstanceArrayLike = (x: any): x is ArrayLike<TrackChord> => {
    return isObjectInstanceArrayLike(x, TrackChord);
};
export const isTrackChordInstanceIterable = (x: any): x is Iterable<TrackChord> => {
    return isObjectInstanceIterable(x, TrackChord);
};

export class TrackChord implements ITrackChord, IClonable<TrackChord>, Iterable<TrackNote> {
    static readonly isTrackChord = isTrackChord;
    static readonly isTrackChordArray = isTrackChordArray;
    static readonly isTrackChordInstanceArrayLike = isTrackChordInstanceArrayLike;
    static readonly isTrackChordInstanceIterable = isTrackChordInstanceIterable;

    static fromArray(arrayIn: ITrackChord[]) {
        return arrayIn.map(e => new TrackChord(e));
    }

    duration: Duration;
    offset: Duration;
    trackNotes?: TrackNote[];
    articulation?: Articulation;
    constructor(trackChord: ITrackChord);
    constructor(note?: number | number[] | string | string[] | INote[] | INote | ITrackNote | ITrackNote[] | IChord, durationIn?: IDuration | number[] | number | TDurationAbbreviation, offsetIn?: IDuration | number[] | number | TDurationAbbreviation, articulationIn?: IArticulation);
    constructor(p1?: ITrackChord | number | number[] | string | string[] | INote[] | INote | ITrackNote | ITrackNote[] | IChord, durationIn: IDuration | number[] | number | TDurationAbbreviation = "4n", offsetIn: IDuration | number[] | number | TDurationAbbreviation = "0", articulationIn?: IArticulation) {
        this.become(p1, durationIn, offsetIn, articulationIn);
    }
    become(p1?: ITrackChord | number | number[] | string | string[] | INote[] | INote | ITrackNote | ITrackNote[] | IChord, durationIn: IDuration | number[] | number | TDurationAbbreviation = "4n", offsetIn: IDuration | number[] | number | TDurationAbbreviation = "0", articulationIn?: IArticulation) {
        if (isTrackChord(p1)) {
            this.duration = new Duration(p1.duration);
            this.offset = new Duration(p1.offset);
            if (p1.trackNotes) this.trackNotes = TrackNote.fromArray(p1.trackNotes);
            if (p1.articulation) this.articulation = new Articulation(p1.articulation);
        } else {
            if (isNumberArray(p1) || isStringArray(p1) || isNoteArray(p1) || isTrackNoteArray(p1)) this.trackNotes = TrackNote.fromArray(p1);
            else if (isChord(p1)) this.trackNotes = TrackNote.fromArray(new Chord(p1).notes);
            else this.trackNotes = TrackNote.fromArray([p1]);
            if (isDuration(durationIn)) this.duration = new Duration(durationIn);
            else if (isDurationAbbreviation(durationIn)) this.duration = new Duration(durationIn);
            else if (typeof durationIn === "number") this.duration = new Duration(durationIn, 4);
            else this.duration = new Duration(durationIn[0], durationIn[1]);
            if (isDuration(offsetIn)) this.offset = new Duration(offsetIn);
            else if (isDurationAbbreviation(offsetIn)) this.offset = new Duration(offsetIn);
            else if (typeof offsetIn === "number") this.offset = new Duration(offsetIn, 4);
            else this.offset = new Duration(offsetIn[0], offsetIn[1]);
            this.articulation = new Articulation(articulationIn);
        }
        return this;
    }
    getChord() {
        if (this.trackNotes.length === 0) return null;
        return new Chord(...this.trackNotes.map(tn => tn.pitch) as [Pitch, ...Pitch[]]);
    }
    setChord(chordIn?: Chord, velocitiesIn?: Velocity[] | number[]) {
        if (chordIn) {
            this.trackNotes = undefined;
            return;
        }
        this.trackNotes = chordIn.notes.map((n: Note | Pitch, i: number) => {
            return new TrackNote(n, velocitiesIn?.[i]);
        });
    }
    setVelocities(velocitiesIn?: IVelocity | number | IVelocity[] | number[]) {
        this.trackNotes.forEach((tn, i) => {
            const v = Array.isArray(velocitiesIn) ? velocitiesIn[i] : velocitiesIn;
            tn.velocity = typeof v === "number" ? new Velocity(v) : new Velocity(v);
        });
    }
    clone() {
        return new TrackChord(this);
    }
    toMidi({ bpm, beats, beatDuration }: ITimeCode = new TimeCode(4, 4, 60)) {
        const midi = new Midi();
        midi.header.setTempo(bpm);
        midi.header.timeSignatures.push({ ticks: 0, measures: 0, timeSignature: [beats, beatDuration] });
        midi.header.update();
        const track = midi.addTrack();
        const ticks = this.offset.getTicks(bpm);
        const durationTicks = this.duration.getTicks(bpm);
        this.trackNotes.forEach((trackNote) => {
            track.addNote({
                midi: ~~trackNote.pitch.offset,
                velocity: trackNote.velocity.normalize(),
                ticks,
                durationTicks
            });
        });
        return midi.toArray();
    }
    async openGuidoEvent(factory: PromisifiedFunctionMap<GuidoFactoryAdapter>, durationIn?: Duration, close = true) {
        if (this.trackNotes.length) {
            for (const trackNote of this) {
                trackNote.pitch.openGuidoEvent(factory, this.duration);
            }
        } else {
            factory.openEvent("_");
            factory.setDuration(durationIn.numerator, durationIn.denominator);
            factory.closeEvent();
        }
    }

    * [Symbol.iterator](): Iterator<TrackNote> {
        for (const trackNote of this.trackNotes) {
            yield trackNote;
        }
    }

    toString() {
        return `${this.offset} -> ${this.trackNotes ? this.trackNotes.toString() : "*"} ${this.duration}`;
    }
}

export default TrackChord;
