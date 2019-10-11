import { Modifier } from "./Modifier";
import { Segment } from "../../track/Segment";

export class HStretcher extends Modifier {
    static use = (s: Segment, factor: number) => {
        if (factor === 0) throw RangeError("Segment Strecher factor cannot be 0.");
        else if (factor > 0) {
            s.duration.mul(factor);
            s.notes.forEach((e) => {
                e.duration.mul(factor);
                e.offset.mul(factor);
            });
            s.automations.forEach(a => a.points.forEach(p => p.offset.mul(factor)));
        } else {
            s.duration.mul(-factor);
            s.notes.forEach((e) => {
                e.duration.mul(-factor);
                e.offset = s.duration.clone().sub(e.offset.mul(-factor).sub(e.duration));
            });
            s.automations.forEach(a => a.points.forEach(p => s.duration.clone().sub(p.offset.mul(-factor))));
        }
        return s;
    }
}
