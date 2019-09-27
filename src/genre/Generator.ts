import { Scale } from "../Scale";
import { TimeCode } from "../TimeCode";
import { Segment } from "../track/Segment";
import { Pitch } from "../Pitch";
import { Duration } from "../Duration";
import { Interval } from "../Interval";

export interface IGeneratorConstraints {
    durationRange?: [Duration, Duration];
    pitchRange?: [Pitch, Pitch];
    noteDurationRange?: [Duration, Duration];
    pitchIntervalRange?: [Interval, Interval];
    timeIntervalRange?: [Duration, Duration];
    scale?: Scale;
    timeCode?: TimeCode;
    // chordprogression
}
export interface IGenerator {
    use: (constraints: IGeneratorConstraints) => Segment;
}
export const isSegment = (x: any): x is IGenerator => {
    return x instanceof Generator
        || (typeof x === "object"
        && typeof x.use === "function");
};

export abstract class Generator implements IGenerator {
    use: (constraints: IGeneratorConstraints) => Segment = () => undefined;
}
