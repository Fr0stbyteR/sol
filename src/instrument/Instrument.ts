import { EnumInstrumentTag, isEnumInstrumentTagArray } from "./EnumInstrumentTag";
import { Pitch, isPitch } from "../Pitch";

export interface IInstrument {
    name: string;
}
export const isInstrument = (x: any): x is Instrument => {
    return x instanceof Instrument
        || (typeof x === "object"
        && typeof x.name === "string");
};
export const isTypeofInstrument = (x: any): x is typeof Instrument => {
    return typeof x === "object"
        && isEnumInstrumentTagArray(x.TAGS)
        && typeof x.NAME === "string"
        && (typeof x.MIN_PITCH === "undefined" || isPitch(x.MIN_PITCH))
        && (typeof x.MAX_PITCH === "undefined" || isPitch(x.MAX_PITCH));
};
export abstract class Instrument implements IInstrument {
    static NAME: string; // instrument name
    static TAGS: EnumInstrumentTag[];
    static MIN_PITCH?: Pitch;
    static MAX_PITCH?: Pitch;
    name: string; // instrument instance name

    constructor(name: string) {
        this.name = name;
    }
    hasTag(...tagsIn: EnumInstrumentTag[]) {
        return tagsIn.every(tag => this.tags.indexOf(tag) !== -1);
    }
    get tags() {
        return (this.constructor as typeof Instrument).TAGS;
    }
    get minPitch() {
        return (this.constructor as typeof Instrument).MIN_PITCH;
    }
    get maxPitch() {
        return (this.constructor as typeof Instrument).MAX_PITCH;
    }
    toString() {
        return this.constructor.name;
    }
}
