import { Scale } from "../../Scale";
import { TimeCode } from "../../TimeCode";
import { Segment } from "../../track/Segment";
import { Pitch } from "../../Pitch";
import { Duration } from "../../Duration";
import { Interval } from "../../Interval";
import { TrackChord } from "../../track/TrackChord";
import { TrackNote } from "../../track/TrackNote";
import { Random } from "../Random";

export interface IGeneratorParameters {
    durationRange?: [Duration, Duration];
    pitchRange?: [Pitch, Pitch];
    noteDurationRange?: [Duration, Duration];
    pitchIntervalRange?: [Interval, Interval];
    timeIntervalRange?: [Duration, Duration];
    scale?: Scale;
    timeCode?: TimeCode;
    chordProgression?: TrackChord[];
    rhythm: TrackNote[];
}
export abstract class Generator {
    static use: (randomIn: Random, params?: { [key: string]: any }) => Segment = () => undefined;
}
