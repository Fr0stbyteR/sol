import { Modifier } from "./Modifier";
import { Random } from "../Random";
import { Segment } from "../../track/Segment";
import { Duration } from "../../Duration";

interface HSidedClipperParams {
    duration: Duration;
    mode: "preserve" | "clip" | "remove"; // mode for last/first notes, preserve or clip their length or remove them
}
export class HClipperRight extends Modifier {
    static use = (randomIn: Random, s: Segment, params: HSidedClipperParams) => {
        const { mode, duration } = params;
        let end = duration.clone();
        s.notes.forEach((note, i) => {
            if (note.offset.compareTo(duration) >= 0) {
                s.notes[i] = null;
            } else {
                const noteEnd = note.offset.clone().add(note.duration);
                if (mode === "preserve") {
                    if (noteEnd.compareTo(end) > 0) end = noteEnd;
                } else {
                    if (noteEnd.compareTo(duration) > 0) {
                        if (mode === "clip") note.duration = noteEnd.sub(duration);
                        else if (mode === "remove") s.notes[i] = null;
                    }
                }
            }
        });
        s.notes = s.notes.filter(e => e);
        s.duration = end;
        s.automations.forEach((a) => {
            a.sort();
            const $oob = a.points.findIndex(p => p.offset.compareTo(end) > 0);
            if ($oob !== -1) a.points = a.points.slice(0, $oob);
        });
        return s;
    }
}
export class HClipperLeft extends Modifier {
    static use = (randomIn: Random, s: Segment, params: HSidedClipperParams) => {
        const { mode, duration } = params;
        let start = duration.clone();
        s.notes.forEach((note, i) => {
            const noteEnd = note.offset.clone().add(note.duration);
            if (noteEnd.compareTo(duration) <= 0) {
                s.notes[i] = null;
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
                            s.notes[i] = null;
                        }
                    }
                }
            }
        });
        s.notes = s.notes.filter(e => e);
        s.duration.sub(start);
        s.notes.forEach(note => note.offset.sub(start));
        s.automations.forEach((a) => {
            a.sort();
            const $0 = a.points.findIndex(p => p.offset.compareTo(start) >= 0);
            if ($0 !== -1) a.points = a.points.slice($0);
            a.rewind(start);
        });
        return s;
    }
}
interface HClipperParams {
    start: Duration;
    end: Duration;
    mode: "preserve" | "clip" | "remove";
}
export class HClipper extends Modifier {
    static use = (randomIn: Random, segmentIn: Segment, params: HClipperParams) => {
        const { mode } = params;
        let { start, end } = params;
        if (start.compareTo(end) > 0) [start, end] = [end, start];
        if (end.compareTo(segmentIn.duration) !== 0) HClipperRight.use(null, segmentIn, { mode, duration: end });
        if (start.compareTo(new Duration(0, 4)) !== 0) HClipperLeft.use(null, segmentIn, { mode, duration: start });
        return segmentIn;
    }
}
