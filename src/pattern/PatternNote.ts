import { isTypeofInstrument } from "../instrument/Instrument";
import { Pitch, isPitch } from "../Pitch";
import { Velocity, isVelocity } from "../Velocity";
import { Duration, isDuration } from "../Duration";
import { Articulation, isArticulation } from "../Articulation";
import { TConcreteInstrument } from "../instrument/EnumInstrument";

export interface IPatternNote {
    instrument: TConcreteInstrument;
    duration: Duration;
    offset: Duration;
    pitch?: Pitch;
    velocity?: Velocity;
    articulation?: Articulation;
}
export const isPatternNote = (x: any): x is IPatternNote => {
    return x instanceof PatternNote
        || (typeof x === "object"
        && isTypeofInstrument(x.instrument)
        && isDuration(x.duration)
        && isDuration(x.offset)
        && (typeof x.pitch === "undefined" || isPitch(x.pitch))
        && (typeof x.velocity === "undefined" || isVelocity(x.velocity))
        && (typeof x.articulation === "undefined" || isArticulation(x.articulation)));
};
export class PatternNote implements IPatternNote {
    instrument: TConcreteInstrument;
    duration: Duration;
    offset: Duration;
    pitch?: Pitch;
    velocity?: Velocity;
    articulation?: Articulation;
    constructor(optionsIn: IPatternNote) {
        this.instrument = optionsIn.instrument;
        this.duration = optionsIn.duration;
        this.offset = optionsIn.offset;
        this.pitch = optionsIn.pitch;
        if (this.pitch) {
            if (this.instrument.MAX_PITCH && Pitch.compare(this.instrument.MAX_PITCH, this.pitch) < 0) this.pitch = this.instrument.MAX_PITCH.clone();
            if (this.instrument.MIN_PITCH && Pitch.compare(this.instrument.MIN_PITCH, this.pitch) > 0) this.pitch = this.instrument.MIN_PITCH.clone();
        }
        this.velocity = optionsIn.velocity;
        this.articulation = optionsIn.articulation;
        return this;
    }
    clone() {
        return new PatternNote(this);
    }
}
