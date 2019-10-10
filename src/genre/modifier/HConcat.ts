import { Modifier } from "./Modifier";
import { Random } from "../Random";
import { Segment } from "../../track/Segment";

export class HConcatOne extends Modifier {
    static use = (randomIn: Random, s1: Segment, sIn2: Segment) => {
        const s2 = sIn2.clone();
        s2.notes.forEach(n => n.offset.add(s1.duration));
        s1.notes.concat(s2.notes);
        s2.automations.forEach(a => a.forward(s1.duration));
        s2.automations.forEach((a2) => {
            const $find = s1.automations.findIndex(a1 => a1.path === a2.path);
            if ($find === -1) s1.automations.push(a2);
            else s1.automations[$find].points.concat(a2.points);
        });
        s1.duration.add(s2.duration);
        return s1;
    }
}

export class HConcat extends Modifier {
    static use = (randomIn: Random, s1: null, segments: Segment[]) => {
        return segments.reduce((s1, s2) => HConcatOne.use(null, s1, s2));
    }
}
