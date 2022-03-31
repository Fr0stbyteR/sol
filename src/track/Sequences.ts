import { Midi } from "@tonejs/midi";
import TimeCode, { ITimeCode } from "../TimeCode";
import { isObjectInstanceArray } from "../utils";
import Sequence, { ISequence, isSequence, isSequenceArray, isSequenceInstanceArrayLike, isSequenceInstanceIterable } from "./Sequence";

export interface ISequences extends Array<Sequence> {}

export const isSequences = (x: any): x is ISequences => {
    return isObjectInstanceArray(x, Sequence);
};

export class Sequences extends Array<Sequence> {
    static readonly isSequences = isSequences;

    static from<T extends Sequence>(arrayLike: Iterable<T> | ArrayLike<T>): Sequence;
    static from<T extends Sequence, U>(arrayLike: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
    static from<T extends Sequence, U>(arrayLike: Iterable<T> | ArrayLike<T>, mapfn?: (v: T, k: number) => U, thisArg?: any) {
        if (!(isSequenceInstanceArrayLike(arrayLike) || isSequenceInstanceIterable(arrayLike))) throw new TypeError("Items from are not Sequences");
        const o = mapfn ? super.from<T, U>(arrayLike, mapfn, thisArg) : super.from<T>(arrayLike);
        return Object.setPrototypeOf(o, Sequences.prototype);
    }
    static of<T>(...items: T[]): T[] {
        if (!isSequenceArray(items)) throw new TypeError("Items of are not Sequences");
        const o = super.of<T>(...items);
        return Object.setPrototypeOf(o, Sequences.prototype);
    }

    constructor(arrayLength?: number);
    constructor(...items: ISequence[]);
    constructor(p1?: number | ISequence, ...arrayIn: ISequence[]) {
        if (typeof p1 === "number" || typeof p1 === "undefined") {
            super(p1);
        } else {
            super(arrayIn.length + 1);
            const sequences = [p1, ...arrayIn];
            if (isSequenceArray(sequences)) super(...Sequence.fromArray(sequences));
        }
    }
    push(...itemsIn: ISequence[]) {
        if (!isSequenceArray(itemsIn)) throw new TypeError("Items to push are not Sequences");
        return super.push(...Sequence.fromArray(itemsIn));
    }
    concat(...itemsIn: (ISequence | ConcatArray<ISequence>)[]) {
        if (!isSequenceArray(itemsIn)) throw new TypeError("Items to concat are not Sequences");
        return super.concat(...Sequence.fromArray(itemsIn));
    }
    unshift(...itemsIn: Sequence[]) {
        if (!isSequenceArray(itemsIn)) throw new TypeError("Items to unshift are not Sequences");
        return super.unshift(...Sequence.fromArray(itemsIn));
    }
    fill(value: ISequence, start?: number, end?: number) {
        if (!isSequence(value)) throw new TypeError("Item to fill is not a Sequence");
        return super.fill(new Sequence(...value), start, end);
    }
    toMidi({ bpm, beats, beatDuration }: ITimeCode = new TimeCode(4, 4, 60)) {
        const midi = new Midi();
        midi.header.setTempo(bpm);
        midi.header.timeSignatures.push({ ticks: 0, measures: 0, timeSignature: [beats, beatDuration] });
        midi.header.update();
        this.forEach((sequence, i) => {
            const track = midi.addTrack();
            track.channel = i;
            sequence.forEach((trackChord) => {
                const ticks = trackChord.offset.getTicks(bpm);
                const durationTicks = trackChord.duration.getTicks(bpm);
                trackChord.trackNotes.forEach((trackNote) => {
                    track.addNote({
                        midi: ~~trackNote.pitch.offset,
                        ticks,
                        durationTicks
                    });
                });
            });
        });
        return midi.toArray();
    }
    async toGuidoAR(factory: PromisifiedFunctionMap<IGuidoWorker>) {
        factory.openMusic();
        for (const sequence of this) {
            factory.openVoice();
            for (const trackChord of sequence) {
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
            }
            factory.closeVoice();
        }
        return factory.closeMusic();
    }
}

export default Sequences;
