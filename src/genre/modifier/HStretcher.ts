import { Modifier } from "./Modifier";
import { Random } from "../Random";
import { Segment } from "../../track/Segment";

export class HStretcher extends Modifier {
    use = (randomIn: Random, segmentIn: Segment, factor: number) => {
        if (factor === 0) throw RangeError("Segment Strecher factor cannot be 0.");
        else if (factor > 0) {
            segmentIn.duration.mul(factor);
            segmentIn.notes.forEach((e) => {
                e.duration.mul(factor);
                e.offset.mul(factor);
            });
        } else {
            segmentIn.duration.mul(-factor);
            segmentIn.notes.forEach((e) => {
                e.duration.mul(-factor);
                e.offset = segmentIn.duration.clone().sub(e.offset.mul(-factor).sub(e.duration));
            });
        }
        return segmentIn;
    }
}
