import { INote, isNote } from "../Note";
import Pitch, { IPitch, isPitch } from "../Pitch";
import { isObjectArray } from "../utils";
import Velocity, { isVelocity, IVelocity } from "../Velocity";

export interface ITrackNote {
    pitch: IPitch;
    velocity: IVelocity;
}

export const isTrackNote = (x: any): x is ITrackNote => {
    return x instanceof TrackNote
        || (typeof x === "object"
        && x !== null
        && isPitch(x.pitch)
        && isVelocity(x.velocity));
};

export const isTrackNoteArray = (x: any): x is ITrackNote[] => {
    return isObjectArray(x, isTrackNote);
};

export default class TrackNote implements ITrackNote, IClonable<TrackNote> {
    static readonly isTrackNote = isTrackNote;
    static readonly isTrackNoteArray = isTrackNoteArray;

    static fromArray(notesIn: (ITrackNote | INote | number | string)[], velocitiesIn: (Velocity | number)[] = []) {
        return notesIn.map((e, i) => {
            const velocity = velocitiesIn[i];
            if (isTrackNote(e)) return new TrackNote(e);
            return new TrackNote(e, velocity);
        });
    }

    pitch: Pitch;
    velocity: Velocity;

    constructor(trackNoteIn: ITrackNote);
    constructor(noteIn: INote | number | string, velocityIn?: Velocity | number);
    constructor(p1: ITrackNote | INote | number | string, velocityIn?: Velocity | number) {
        this.become(p1, velocityIn);
    }
    become(p1: ITrackNote | INote | number | string, velocityIn?: Velocity | number) {
        if (isTrackNote(p1)) {
            const { pitch, velocity } = p1;
            this.pitch = new Pitch(pitch);
            this.velocity = new Velocity(velocity);
        } else {
            if (typeof p1 === "number") this.pitch = new Pitch(p1);
            else if (typeof p1 === "string") this.pitch = new Pitch(p1);
            else if (isNote(p1)) this.pitch = new Pitch(p1);
            if (velocityIn instanceof Velocity) this.velocity = velocityIn.clone();
            else if (typeof velocityIn === "number") this.velocity = new Velocity(velocityIn);
            else this.velocity = new Velocity(85);
        }
        return this;
    }
    clone() {
        return new TrackNote(this);
    }
}
