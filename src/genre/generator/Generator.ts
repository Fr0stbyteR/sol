import Scale from "../../Scale";
import TimeCode from "../../TimeCode";
import Segment from "../../track/Segment";
import Pitch from "../../Pitch";
import Duration from "../../Duration";
import Interval from "../../Interval";
import TrackTonalChord from "../../track/TrackTonalChord";
import TrackChord from "../../track/TrackChord";
import Random from "../Random";
import Chord from "../../Chord";

export interface IGeneratorParams {
    durationRange: [Duration, Duration];
    durationStep: Duration;
    pitchRange: [Pitch, Pitch];
    noteDurationRange: [Duration, Duration];
    pitchIntervalRange: [Interval, Interval];
    timeIntervalRange: [Duration, Duration];
    scale: Scale;
    timeCode: TimeCode;
    chordProgression: TrackTonalChord[];
    rhythm: TrackChord[];
    baseNote: TrackChord;
    baseChord: Chord;
    stability: number;
    complexity: number;
}
export abstract class Generator {
    static use: (randomIn: Random, params?: Partial<IGeneratorParams>) => Segment;
}

export default Generator;
