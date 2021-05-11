import Segment, { isSegmentArray } from "../track/Segment";

export interface IPattern {
    segments: Segment[];
}
export const isPattern = (x: any): x is IPattern => {
    return x instanceof Pattern
        || (typeof x === "object"
        && x !== null
        && isSegmentArray(x.segments));
};
export class Pattern implements IPattern {
    static readonly isPattern = isPattern;

    segments: Segment[];
    constructor(...segments: Segment[]);
    constructor(patternIn: IPattern);
    constructor(p1: IPattern | Segment, ...rest: Segment[]) {
        if (isPattern(p1)) {
            this.segments = p1.segments.map(e => e.clone());
        } else {
            this.segments = [p1.clone(), ...rest.map(e => e.clone())];
        }
    }
    clone() {
        return new Pattern(this);
    }
}

export default Pattern;
