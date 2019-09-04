import { Param, isParam } from "../Param";
import { isNumberArray } from "../Utils";

export interface IEffect {
    name: string;
    sideChain: number[];
    send: number[];
    params: { [path: string]: Param };
}
export const isEffect = (x: any): x is IEffect => {
    return x instanceof Effect
        || (typeof x.name === "string"
        && isNumberArray(x.sideChain)
        && isNumberArray(x.send)
        && Object.keys(x.params).every(k => isParam(x.params[k])));
};
export const isEffectArray = (x: any): x is Effect[] => {
    return Array.isArray(x)
        && x.every(el => el instanceof Effect);
};
export class Effect implements IEffect {
    name: string;
    sideChain: number[];
    send: number[];
    params: { [key: string]: Param };
    constructor(optionsIn: IEffect) {
        this.sideChain = [...optionsIn.sideChain];
        this.send = [...optionsIn.send];
        this.params = {};
        for (const key in optionsIn.params) {
            this.params[key] = optionsIn.params[key].clone();
        }
        return this;
    }
    getParamValue(path: string) {
        return this.params[path] ? this.params[path].value : null;
    }
    setParamValue(path: string, value: number) {
        if (this.params[path]) this.params[value].value = value;
    }
    clone() {
        return new Effect(this);
    }
}
