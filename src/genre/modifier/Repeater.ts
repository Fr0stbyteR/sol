import Modifier from "./Modifier";
import Segment from "../../track/Segment";
import HConcat from "./HConcat";
import HStretcher from "./HStretcher";
import { HClipperRight, HClipperLeft } from "./HClipper";
import Duration from "../../Duration";

export class Repeater extends Modifier {
    static use = (s: Segment, times: number) => {
        if (times === 0) return HClipperRight.use(s, { duration: new Duration(0, 4) });
        const fTimes = Math.abs(times % 1);
        const iTimes = Math.trunc(times);
        if (iTimes === 0) {
            if (fTimes > 0) return HClipperRight.use(s, { duration: s.duration.clone().mul(fTimes) });
            if (fTimes < 0) return HClipperLeft.use(s, { duration: s.duration.clone().mul(fTimes) });
        }
        const concat: Segment[] = [];
        if (iTimes > 0) {
            const clone = s.clone();
            for (let i = 0; i < iTimes; i++) {
                concat.push(i === 0 ? s : clone);
            }
            if (fTimes > 0) concat.push(HClipperRight.use(s.clone(), { duration: s.duration.clone().mul(fTimes) }));
        } else {
            HStretcher.use(s, -1);
            const clone = s.clone();
            if (fTimes < 0) concat.push(HClipperLeft.use(s, { duration: s.duration.clone().mul(fTimes) }));
            for (let i = 0; i < iTimes; i++) {
                concat.push(clone);
            }
        }
        return HConcat.use(null, concat);
    };
}

export default Repeater;
