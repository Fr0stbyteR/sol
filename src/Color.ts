import { isNumberArray } from "./utils";

interface IColor {
    t: number;
    s: number;
    d: number;
    major: number;
}
export const isColor = (x: any): x is IColor => {
    return x instanceof Color
        || (typeof x === "object"
        && typeof x.t === "number"
        && typeof x.s === "number"
        && typeof x.d === "number"
        && x.major === "number");
};
class Color implements IColor {
    t: number;
    s: number;
    d: number;
    major: number;

    constructor();
    constructor(t?: number, s?: number, d?: number, major?: number);
    constructor(color: number[]);
    constructor(colorIn: Color);
    constructor(first?: number | number[] | IColor, s?: number, d?: number, major?: number) {
        if (isColor(first)) {
            this.t = first.t;
            this.s = first.s;
            this.d = first.d;
            this.major = first.major;
        } else if (isNumberArray(first)) {
            this.fromArray(first);
        } else {
            this.t = first || 0;
            this.s = s || 0;
            this.d = d || 0;
            this.major = major || 0;
        }
    }
    toArray() {
        return [this.t, this.s, this.d, this.major];
    }
    fromArray(color: number[]) {
        this.t = color[0] || 0;
        this.s = color[1] || 0;
        this.d = color[2] || 0;
        this.major = color[3] || 0;
        return this;
    }
    equals(colorIn: object) {
        return isColor(colorIn)
            && this.t === colorIn.t
            && this.s === colorIn.s
            && this.d === colorIn.d
            && this.major === colorIn.major;
    }
    toString() {
        return `Color{t=${this.t}, s=${this.s}, d=${this.d}, major=${this.major}}`;
    }
    clone() {
        return new Color(this);
    }
}

export default Color;
