import { Generator } from "./Generator";
import { Random } from "../Random";
import { Duration } from "../../Duration";
import { Segment } from "../../track/Segment";
import { TrackNote } from "../../track/TrackNote";
import { Automation } from "../../effect/Automation";
import { Pitch } from "../../Pitch";

export interface IRhythmGeneratorAParams {
    durationRange: [Duration, Duration];
    durationStep: Duration;
    noteDurationRange: [Duration, Duration];
}
export class RhythmGeneratorA extends Generator {
    static use = (randomIn: Random, params: IRhythmGeneratorAParams) => {
        const { durationRange, durationStep } = params;
        const duration = Duration.random(randomIn, durationRange[0], durationRange[1], durationStep);
        const notes: TrackNote[] = [];
        const automations: Automation[] = [];
        const seg = new Segment({ notes, duration, automations });
        return seg;
    }
    static pitchBase = 24;
    static noteDuration = new Duration(1, 16);
    static fill = (randomIn: Random, pIn: number, segmentIn: Segment, resolutionIn: Duration, orderIn: number) => {
        const { duration, notes } = segmentIn;
        const $ = new Duration(0, 4);
        const { pitchBase, noteDuration } = RhythmGeneratorA;
        const pitch = new Pitch(pitchBase + orderIn);
        while ($.compareTo(duration) > 0) {
            if (randomIn.quick() < pIn) notes.push(new TrackNote({ duration: noteDuration, offset: $.clone(), pitch }));
            $.add(resolutionIn);
        }
    }
    static preparation = (randomIn: Random, pIn: number, segmentIn: Segment, resolutionIn: Duration, orderIn: number) => {
        const { notes } = segmentIn;
        for (const note of notes) {
            if (note.offset.compareTo(resolutionIn) < 0) continue;
            if (randomIn.quick() < pIn) {
                const $ = note.offset.clone().sub(resolutionIn);
                const newNote = note.clone();
                newNote.offset = $;
                segmentIn.notes.push(newNote);
            }
        }
    }
}
