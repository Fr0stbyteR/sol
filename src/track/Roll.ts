import { Midi } from "@tonejs/midi";
import { IArticulation } from "../Articulation";
import { IChord } from "../Chord";
import Duration, { TDurationAbbreviation } from "../Duration";
import { INote } from "../Note";
import TimeCode, { ITimeCode } from "../TimeCode";
import { IVelocity } from "../Velocity";
import TrackChord, { isTrackChord, isTrackChordArray, isTrackChordInstanceArrayLike, isTrackChordInstanceIterable, ITrackChord } from "./TrackChord";
import { ITrackNote } from "./TrackNote";

export interface IRoll extends Array<TrackChord> {}

export const isRoll = isTrackChordArray;

export class Roll extends Array<TrackChord> {
    static readonly isRoll = isRoll;
    static from<T extends TrackChord>(arrayLike: Iterable<T> | ArrayLike<T>): Roll;
    static from<T extends TrackChord, U>(arrayLike: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
    static from<T extends TrackChord, U>(arrayLike: Iterable<T> | ArrayLike<T>, mapfn?: (v: T, k: number) => U, thisArg?: any) {
        if (!(isTrackChordInstanceArrayLike(arrayLike) || isTrackChordInstanceIterable(arrayLike))) throw new TypeError("Items from are not TrackChords");
        if (mapfn) return super.from<T, U>(arrayLike, mapfn, thisArg);
        return super.from<T>(arrayLike);
    }
    static of<T>(...items: T[]): T[] {
        if (!isTrackChordArray(items)) throw new TypeError("Items of are not TrackChords");
        return super.of<T>(...items);
    }

    static fromArrays(chordsIn: (number | number[] | string | string[] | INote[] | INote | ITrackNote | ITrackNote[] | IChord | ITrackChord)[], offsetsIn?: (number | TDurationAbbreviation | Duration)[], durationsIn?: (number | TDurationAbbreviation | Duration)[], velocitiesIn?: (number | number[] | IVelocity | IVelocity[])[], articulationsIn?: IArticulation[]) {
        const seq = new Roll();
        for (let i = 0; i < Math.max(chordsIn.length, durationsIn?.length || 0); i++) {
            let tc: TrackChord;
            const cIn = chordsIn[i];
            const oIn = offsetsIn?.[i];
            const dIn = durationsIn?.[i];
            const vIn = velocitiesIn?.[i];
            const aIn = articulationsIn?.[i];
            if (isTrackChord(cIn)) tc = new TrackChord(cIn);
            else tc = new TrackChord(cIn, dIn, oIn, aIn);
            tc.setVelocities(vIn);
            seq[i] = tc;
        }
        return seq;
    }

    constructor(arrayLength?: number);
    constructor(...items: ITrackChord[]);
    constructor(p1?: number | ITrackChord, ...arrayIn: ITrackChord[]) {
        if (typeof p1 === "number" || typeof p1 === "undefined") {
            super(p1);
        } else {
            super(arrayIn.length + 1);
            const trackChords = [p1, ...arrayIn];
            if (isRoll(trackChords)) super(...TrackChord.fromArray(trackChords));
        }
    }
    push(...itemsIn: ITrackChord[]) {
        if (!isTrackChordArray(itemsIn)) throw new TypeError("Items to push are not TrackChords");
        return super.push(...TrackChord.fromArray(itemsIn));
    }
    concat(...itemsIn: (ITrackChord | ConcatArray<ITrackChord>)[]) {
        if (!isTrackChordArray(itemsIn)) throw new TypeError("Items to concat are not TrackChords");
        return super.concat(...TrackChord.fromArray(itemsIn));
    }
    unshift(...itemsIn: TrackChord[]) {
        if (!isTrackChordArray(itemsIn)) throw new TypeError("Items to unshift are not TrackChords");
        return super.unshift(...TrackChord.fromArray(itemsIn));
    }
    fill(value: ITrackChord, start?: number, end?: number) {
        if (!isTrackChord(value)) throw new TypeError("Item to fill is not a TrackChord");
        return super.fill(new TrackChord(value), start, end);
    }
    toMidi({ bpm, beats, beatDuration }: ITimeCode = new TimeCode(4, 4, 60)) {
        const midi = new Midi();
        midi.header.setTempo(bpm);
        midi.header.timeSignatures.push({ ticks: 0, measures: 0, timeSignature: [beats, beatDuration] });
        midi.header.update();
        const track = midi.addTrack();
        this.forEach((trackChord) => {
            const ticks = trackChord.offset.getTicks(bpm);
            const durationTicks = trackChord.duration.getTicks(bpm);
            trackChord.trackNotes.forEach((trackNote) => {
                track.addNote({
                    midi: ~~trackNote.pitch.offset,
                    velocity: trackNote.velocity.normalize(),
                    ticks,
                    durationTicks
                });
            });
        });
        return midi.toArray();
    }
    async toGuidoAR(factory: PromisifiedFunctionMap<IGuidoWorker>, spaceFactor = 1) {
        factory.openMusic();
        factory.openVoice();
        for (let i = 0; i < this.length; i++) {
            const trackChord = this[i];
            const nextTrackChord = this[i + 1];
            const space = nextTrackChord ? nextTrackChord.offset.sub(trackChord.offset).getBeats() : trackChord.duration.getBeats();
            factory.openChord();
            if (!trackChord.trackNotes.length) {
                factory.openEvent("_");
                factory.closeEvent();
            } else {
                for (const trackNote of trackChord) {
                    trackNote.pitch.openGuidoEvent(factory, trackChord.duration);
                }
            }
            factory.closeChord();
            factory.openTag("space", 0);
            factory.addTagParameterFloat(space * 16 * spaceFactor);
            factory.setParameterUnit("hs");
            factory.setParameterName("dd");
            factory.closeTag();
        }
        factory.closeVoice();
        return factory.closeMusic();
    }
}

export default Roll;
