import { Modifier } from "./Modifier";
import { Random } from "../Random";
import { Segment } from "../../track/Segment";
import { Duration } from "../../Duration";

interface HSidedClipperParams {
    duration: Duration;
    mode: "preserve" | "clip" | "remove"; // mode for last notes, preserve or clip their length or remove them
}
export class HClipperRight extends Modifier {
    static use = (randomIn: Random, segmentIn: Segment, params: HSidedClipperParams) => {
        const { mode, duration } = params;
        let end = duration.clone();
        segmentIn.notes.forEach((note, i) => {
            if (note.offset.compareTo(duration) >= 0) {
                segmentIn.notes[i] = null;
            } else {
                const noteEnd = note.offset.clone().add(note.duration);
                if (mode === "preserve") {
                    if (noteEnd.compareTo(end) > 0) end = noteEnd;
                } else {
                    if (noteEnd.compareTo(duration) > 0) {
                        if (mode === "clip") note.duration = noteEnd.sub(duration);
                        else if (mode === "remove") segmentIn.notes[i] = null;
                    }
                }
            }
        });
        segmentIn.notes = segmentIn.notes.filter(e => e);
        segmentIn.duration = end;
        return segmentIn;
    }
}
export class HClipperLeft extends Modifier {
    static use = (randomIn: Random, segmentIn: Segment, params: HSidedClipperParams) => {
        const { mode, duration } = params;
        let start = duration.clone();
        segmentIn.notes.forEach((note, i) => {
            const noteEnd = note.offset.clone().add(note.duration);
            if (noteEnd.compareTo(duration) <= 0) {
                segmentIn.notes[i] = null;
            } else {
                if (mode === "preserve") {
                    if (note.offset.compareTo(start) < 0) start = note.offset;
                } else {
                    if (note.offset.compareTo(duration) < 0) {
                        if (mode === "clip") {
                            const oldDuration = note.duration;
                            note.duration = noteEnd.sub(duration);
                            note.offset.add(oldDuration.sub(note.duration));
                        } else if (mode === "remove") {
                            segmentIn.notes[i] = null;
                        }
                    }
                }
            }
        });
        segmentIn.notes = segmentIn.notes.filter(e => e);
        segmentIn.duration.sub(start);
        segmentIn.notes.forEach(note => note.offset.sub(start));
        return segmentIn;
    }
}
