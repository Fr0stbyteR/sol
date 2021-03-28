export interface IParam {
    path: string;
    name?: string;
    min: number;
    max: number;
    step: number;
    value: number;
}
export const isParam = (x: any): x is IParam => {
    return x instanceof Param
        || (typeof x === "object"
        && typeof x.path === "string"
        && (typeof x.name === "undefined" || x.name === "string")
        && typeof x.min === "number"
        && typeof x.max === "number"
        && typeof x.step === "number"
        && typeof x.value === "number"
        && typeof x.init === "number");
};
export class Param implements IParam {
    static readonly isParam = isParam;

    readonly path: string;
    name?: string;
    private _min: number;
    private _max: number;
    step: number;
    private _value: number;
    constructor(optionsIn: IParam) {
        this.path = optionsIn.path;
        this.name = optionsIn.name;
        this._value = optionsIn.value;
        this.step = optionsIn.step;
        this.setRange(optionsIn.min, optionsIn.max);
    }
    get value(): number {
        return this._value;
    }
    set value(valueIn: number) {
        if (valueIn < this.min) {
            this._value = this.min;
        } else if (valueIn > this.max) {
            const d = this.max - this.min;
            this._value = this.min + d - d % this.step;
        } else {
            const d = valueIn - this.min;
            this._value = this.min + d - d % this.step;
        }
    }
    get min() {
        return this._min;
    }
    set min(minIn: number) {
        this._min = Math.min(minIn, this.max);
        if (this.value < this.min) this.value = this.min;
    }
    get max() {
        return this._max;
    }
    set max(maxIn: number) {
        this._max = Math.max(maxIn, this.min);
        if (this.value > this.max) this.value = this.max;
    }
    setRange(minIn: number, maxIn: number) {
        const min = Math.min(minIn, maxIn);
        const max = Math.max(minIn, maxIn);
        this._min = min;
        this._max = max;
        this.value = this._value;
    }
    clone() {
        return new Param(this);
    }
}

export default Param;
