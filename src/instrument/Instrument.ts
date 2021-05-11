import { EnumInstrumentTag, isEnumInstrumentTagArray } from "./EnumInstrumentTag";
import Pitch, { isPitch } from "../Pitch";
import Param from "../Param";

export interface IInstrument {
    name: string;
    params: Record<string, Param>;
}
export type TConcreteInstrument = typeof Instrument & (new (optionsIn: IInstrument) => Instrument);
export const isInstrument = (x: any): x is Instrument => {
    return x instanceof Instrument
        || (typeof x === "object"
        && x !== null
        && typeof x.name === "string");
};
export const isTypeofInstrument = (x: any): x is typeof Instrument => {
    return typeof x === "object"
        && x !== null
        && isEnumInstrumentTagArray(x.TAGS)
        && typeof x.NAME === "string"
        && (typeof x.MIN_PITCH === "undefined" || isPitch(x.MIN_PITCH))
        && (typeof x.MAX_PITCH === "undefined" || isPitch(x.MAX_PITCH));
};
export abstract class Instrument implements IInstrument {
    static readonly isInstrument = isInstrument;
    static readonly isTypeofInstrument = isTypeofInstrument;

    static NAME: string; // instrument name
    static TAGS: EnumInstrumentTag[];
    static MIN_PITCH?: Pitch;
    static MAX_PITCH?: Pitch;
    name: string; // instrument instance name
    params: Record<string, Param>;

    constructor(optionsIn: IInstrument) {
        this.name = optionsIn.name;
        this.params = {};
        for (const key in optionsIn.params) {
            this.params[key] = optionsIn.params[key].clone();
        }
    }
    getParamValue(path: string) {
        return this.params[path] ? this.params[path].value : null;
    }
    setParamValue(path: string, value: number) {
        if (this.params[path]) this.params[value].value = value;
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

export default Instrument;
