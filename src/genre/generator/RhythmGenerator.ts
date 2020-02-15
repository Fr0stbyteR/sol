import { Generator } from "./Generator";
import { Random } from "../Random";
import { Duration } from "../../Duration";
import { Segment } from "../../track/Segment";
import { TrackNote } from "../../track/TrackNote";
import { Automation } from "../../effect/Automation";

export interface IRhythmGeneratorAParams {
    durationRange: [Duration, Duration];
    durationStep: Duration;
    noteDurationRange: [Duration, Duration];
    baseNote: TrackNote;
}
type TPipe = (segmentIn: Segment, randomIn: Random, pIn: number, resolutionIn: Duration, orderIn: number, baseNoteIn: TrackNote) => void;
export class RhythmGeneratorA extends Generator {
    static use = (randomIn: Random, params: IRhythmGeneratorAParams) => {
        const { durationRange, durationStep } = params;
        const duration = Duration.random(randomIn, durationRange[0], durationRange[1], durationStep);
        const notes: TrackNote[] = [];
        const automations: Automation[] = [];
        const seg = new Segment({ notes, duration, automations });
        return seg;
    }
    static fill: TPipe = (segmentIn, randomIn, pIn, gridIn, orderIn, baseNoteIn) => {
        const { duration, notes } = segmentIn;
        const $ = new Duration(0, 4);
        const note = baseNoteIn.clone();
        if (orderIn) note.velocity.mul(0.9 ** orderIn);
        while ($.compareTo(duration) > 0) {
            if (randomIn.quick() < pIn) notes.push(note);
            $.add(gridIn);
        }
    }
    static prepare: TPipe = (segmentIn, randomIn, pIn, gridIn, orderIn, baseNoteIn) => {
        const { notes } = segmentIn;
        for (const note of notes) {
            if (note.offset.compareTo(gridIn) < 0) continue;
            if (randomIn.quick() < pIn) {
                const $note = note.clone();
                if (orderIn) $note.velocity = baseNoteIn.velocity.clone().mul(0.9 ** orderIn);
                $note.offset.sub(gridIn);
                segmentIn.notes.push($note);
            }
        }
    }
    static anticipate: TPipe = (segmentIn, randomIn, pIn, gridIn, orderIn, baseNoteIn) => {
        const { notes } = segmentIn;
        for (const note of notes) {
            if (note.offset.compareTo(gridIn) < 0) continue;
            if (randomIn.quick() < pIn) {
                if (orderIn) note.velocity = baseNoteIn.velocity.clone().mul(0.9 ** orderIn);
                note.offset.sub(gridIn);
            }
        }
    }
    static rebound: TPipe = (segmentIn, randomIn, pIn, gridIn, orderIn, baseNoteIn) => {
        const { notes, duration } = segmentIn;
        const end = duration.clone().sub(gridIn);
        for (const note of notes) {
            if (note.offset.compareTo(end) > 0) continue;
            if (randomIn.quick() < pIn) {
                const $note = note.clone();
                if (orderIn) $note.velocity = baseNoteIn.velocity.clone().mul(0.9 ** orderIn);
                $note.offset.add(gridIn);
                segmentIn.notes.push($note);
            }
        }
    }
    static defer: TPipe = (segmentIn, randomIn, pIn, gridIn, orderIn, baseNoteIn) => {
        const { notes, duration } = segmentIn;
        const end = duration.clone().sub(gridIn);
        for (const note of notes) {
            if (note.offset.compareTo(end) > 0) continue;
            if (randomIn.quick() < pIn) {
                if (orderIn) note.velocity = baseNoteIn.velocity.clone().mul(0.9 ** orderIn);
                note.offset.add(gridIn);
            }
        }
    }
}
