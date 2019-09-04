import { TrackNote, isTrackNoteArray } from "./TrackNote";
import { Effect, isEffectArray } from "./effect/Effect";
import { Automation, isAutomationArray } from "./effect/Automation";
import { isTypeofInstrument, TConcreteInstrument } from "./instrument/Instrument";

export interface ITrack {
    name: string;
    instrument?: TConcreteInstrument;
    notes: TrackNote[];
    effects: Effect[];
    automations: Automation[];
    output: Track;
}
export const isTrack = (x: any): x is ITrack => {
    return x instanceof Track
        || (typeof x === "object"
        && typeof x.name === "string"
        && (typeof x.instrument === "undefined" || isTypeofInstrument(x.instrument))
        && isTrackNoteArray(x.notes)
        && isEffectArray(x.effects)
        && isAutomationArray(x.automations)
        && isTrack(x.output));
};
export class Track implements ITrack {
    name: string;
    instrument?: TConcreteInstrument;
    notes: TrackNote[];
    effects: Effect[];
    automations: Automation[];
    output: Track;
}
