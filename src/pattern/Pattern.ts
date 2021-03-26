import Segment, { isSegmentArray } from "../track/Segment";

export interface IPattern {
    segments: Segment[];
}
export const isPattern = (x: any): x is IPattern => {
    return x instanceof Pattern
        || (typeof x === "object"
        && isSegmentArray(x.segments));
};
export class Pattern implements IPattern {
    segments: Segment[];
    constructor(...segments: Segment[]);
    constructor(patternIn: IPattern);
    constructor(first: IPattern | Segment, ...rest: Segment[]) {
        if (isPattern(first)) {
            this.segments = first.segments.map(e => e.clone());
        } else {
            this.segments = [first.clone(), ...rest.map(e => e.clone())];
        }
    }
    clone() {
        return new Pattern(this);
    }
}

export default Pattern;
