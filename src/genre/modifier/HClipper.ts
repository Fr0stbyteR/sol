import { Modifier } from "./Modifier";
import { Random } from "../Random";
import { Segment } from "../../track/Segment";
import { Duration } from "../../Duration";

interface HClipperParams {
    duration: Duration;
    mode: "preserve" | "clip" | "remove"; // mode for last notes, preserve or clip their length or remove them
}
export class HClipper extends Modifier {
    static use = (randomIn: Random, segmentIn: Segment, params: HClipperParams) => {
        const { mode, duration } = params;
        let maxNoteEnd = new Duration(0, 4);
        segmentIn.notes.forEach((note, i) => {
            if (note.offset.compareTo(duration) >= 0) {
                segmentIn.notes[i] = null;
            } else {
                const noteEnd = note.offset.clone().add(note.duration);
                if (noteEnd.compareTo(maxNoteEnd) > 0) maxNoteEnd = noteEnd;
                if (noteEnd.compareTo(duration) > 0) {
                    if (mode === "clip") note.duration = noteEnd.sub(duration);
                    else if (mode === "remove") segmentIn.notes[i] = null;
                }
            }
        });
        segmentIn.notes = segmentIn.notes.filter(e => e);
        segmentIn.duration = mode === "preserve" ? maxNoteEnd : duration;
        return segmentIn;
    }
}
