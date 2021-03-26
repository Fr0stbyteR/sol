import Modifier from "./Modifier";
import Segment from "../../track/Segment";
import Duration from "../../Duration";

interface IHSidedClipperParams {
    duration: Duration;
    mode?: "preserve" | "clip" | "remove"; // mode for last/first notes, preserve or clip their length or remove them
}
export class HClipperRight extends Modifier {
    static use = (s: Segment, params: IHSidedClipperParams) => {
        const duration = params.duration;
        const mode = params.mode || "clip";
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
    };
}
export class HClipperLeft extends Modifier {
    static use = (s: Segment, params: IHSidedClipperParams) => {
        const duration = params.duration;
        const mode = params.mode || "clip";
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
    };
}
interface IHClipperParams {
    start: Duration;
    end: Duration;
    mode: "preserve" | "clip" | "remove";
}
export class HClipper extends Modifier {
    static use = (s: Segment, params: IHClipperParams) => {
        const mode = params.mode || "clip";
        let { start, end } = params;
        if (start.compareTo(end) > 0) [start, end] = [end, start];
        if (end.compareTo(s.duration) !== 0) HClipperRight.use(s, { mode, duration: end });
        if (start.compareTo(new Duration(0, 4)) !== 0) HClipperLeft.use(s, { mode, duration: start });
        return s;
    };
}

export default HClipper;
