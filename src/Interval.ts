import { floorMod, isObjectArray, nearestFraction, nearestReciprocal } from "./utils";
import Enum from "./Enum";
import Frequency from "./Frequency";

export interface IInterval {
    degree: number;
    onset: number;
    octave: number;
}
export type TIntervalOffset = 0 | 2 | 4 | 5 | 7 | 9 | 11;
export const DEGREE_TO_OFFSET = [0, 2, 4, 5, 7, 9, 11];
export const isInterval = (x: any): x is IInterval => {
    return x instanceof Interval
        || (typeof x === "object"
        && x !== null
        && typeof x.degree === "number"
        && typeof x.onset === "number"
        && typeof x.octave === "number");
};
export const isIntervalArray = (x: any): x is IInterval[] => {
    return isObjectArray(x, isInterval);
};
type TIntervalProperty = "P" | "M" | "m" | "A" | "d";
type TIntervalPropertyValue = "PERFECT" | "MAJOR" | "MINOR" | "AUGMENTED" | "DIMINISHED";
class EnumIntervalProperty extends Enum {
    protected static indexes = ["PERFECT", "MAJOR", "MINOR", "AUGMENTED", "DIMINISHED"];
    private static abbMap: Record<string, TIntervalPropertyValue> = { P: "PERFECT", M: "MAJOR", m: "MINOR", A: "AUGMENTED", d: "DIMINISHED" };
    static get PERFECT() { return new EnumIntervalProperty("P"); }
    static get MAJOR() { return new EnumIntervalProperty("M"); }
    static get MINOR() { return new EnumIntervalProperty("m"); }
    static get AUGMENTED() { return new EnumIntervalProperty("A"); }
    static get DIMINISHED() { return new EnumIntervalProperty("d"); }
    static byAbb(abbIn: string) {
        const name = this.abbMap[abbIn];
        if (name) return EnumIntervalProperty[name];
        throw new SyntaxError(`No such interval property with abbreviation ${abbIn}.`);
    }
    abb: TIntervalProperty;
    private constructor(abbIn: TIntervalProperty) {
        super();
        this.abb = abbIn;
    }
    get className() {
        return "EnumIntervalProperty" as const;
    }
    name() {
        return EnumIntervalProperty.abbMap[this.abb];
    }
    toString() {
        return this.name();
    }
    equals(propertyIn: object) {
        return propertyIn instanceof EnumIntervalProperty
            && this.abb === propertyIn.abb;
    }
}

export class Interval implements IInterval, IClonable<Interval>, IComputable<Interval> {
    private static readonly REGEX = /^([PMmAd])([0-9]+)((\+|-)\d+)?$/;
    static readonly DEGREE_TO_OFFSET = DEGREE_TO_OFFSET;
    static readonly isInterval = isInterval;
    static readonly isIntervalArray = isIntervalArray;
    static readonly EnumIntervalProperty = EnumIntervalProperty;

    degree: number;
    onset: number;
    octave: number;
    static getOffsetFromProperty(propertyIn: EnumIntervalProperty, degreeIn: number) {
        const degree = typeof degreeIn === "number" ? floorMod(degreeIn - 1, 7) + 1 : 1;
        if (degree === 1 || degree === 4 || degree === 5) {
            if (propertyIn.equals(EnumIntervalProperty.PERFECT)) return 0;
            if (propertyIn.equals(EnumIntervalProperty.AUGMENTED)) return 1;
            if (propertyIn.equals(EnumIntervalProperty.DIMINISHED)) return -1;
        } else {
            if (propertyIn.equals(EnumIntervalProperty.MAJOR)) return 0;
            if (propertyIn.equals(EnumIntervalProperty.MINOR)) return -1;
            if (propertyIn.equals(EnumIntervalProperty.AUGMENTED)) return 1;
            if (propertyIn.equals(EnumIntervalProperty.DIMINISHED)) return -2;
        }
        return 0;
    }
    static getPropertyFromOffset(onsetIn: number, degreeIn: number) {
        const degree = typeof degreeIn === "number" ? floorMod(degreeIn - 1, 7) + 1 : 1;
        if (degree === 1 || degree === 4 || degree === 5) {
            if (onsetIn === 0) return EnumIntervalProperty.PERFECT;
            if (onsetIn === 1) return EnumIntervalProperty.AUGMENTED;
            if (onsetIn === -1) return EnumIntervalProperty.DIMINISHED;
        } else {
            if (onsetIn === 0) return EnumIntervalProperty.MAJOR;
            if (onsetIn === -1) return EnumIntervalProperty.MINOR;
            if (onsetIn === 1) return EnumIntervalProperty.AUGMENTED;
            if (onsetIn === -2) return EnumIntervalProperty.DIMINISHED;
        }
        return null;
    }
    static getOffsetFromDegree(degreeIn: number) {
        return typeof degreeIn === "number" ? DEGREE_TO_OFFSET[floorMod(degreeIn - 1, 7)] + 12 * Math.floor((degreeIn - 1) / 7) : 0;
    }
    /**
     * Returns Unison
     */
    constructor();
    /**
     * Gives a new Interval instance (clone)
     */
    constructor(intervalIn: IInterval);
    /**
     * Parse interval string
     * @example
     * new Interval("d6");
     * @throws {SyntaxError} when parse failed
     */
    constructor(intervalIn: string);
    /**
     * Creates an instance of Interval.
     */
    constructor(degreeIn: number, onset?: number, octave?: number);
    constructor(p1?: IInterval | string | number, p2?: number, p3?: number) {
        this.become(p1, p2, p3);
    }
    become(p1?: IInterval | string | number, p2?: number, p3?: number) {
        this.degree = 0;
        this.onset = 0;
        this.octave = 0;
        if (isInterval(p1)) {
            this.fromInterval(p1.degree, p1.onset, p1.octave);
        } else if (typeof p1 === "string") {
            this.fromString(p1);
        } else if (typeof p1 === "number") {
            this.fromInterval(p1, p2, p3);
        }
        return this;
    }
    protected fromInterval(degreeIn: number, onsetIn = 0, octaveIn = 0) {
        this.degree = floorMod(degreeIn - 1, 7) + 1;
        this.onset = onsetIn;
        this.octave = Math.floor((degreeIn - 1) / 7) + octaveIn;
    }
    static fromString(nameIn: string): IInterval {
        const matched = Interval.REGEX.exec(nameIn);
        if (matched === null) throw new SyntaxError(`No such interval ${nameIn}.`);
        const degree = parseInt(matched[2]);
        const onset = Interval.getOffsetFromProperty(EnumIntervalProperty.byAbb(matched[1]), degree);
        const octave = parseInt(matched[3]) || 0;
        return { degree, onset, octave };
    }
    protected fromString(nameIn: string) {
        const { degree, onset, octave } = Interval.fromString(nameIn);
        this.degree = degree;
        this.onset = onset;
        this.octave = octave;
        return this;
    }
    static fromOffset(offsetIn: number): IInterval {
        let degree = 0;
        let onset = 0;
        const octave = Math.floor(offsetIn / 12);
        for (let i = 0; i < DEGREE_TO_OFFSET.length; i++) {
            if (DEGREE_TO_OFFSET[i] === floorMod(offsetIn, 12)) {
                degree = i + 1;
                onset = 0;
                break;
            } else if (DEGREE_TO_OFFSET[i] === floorMod(offsetIn, 12) + 1) {
                degree = i + 1;
                onset = -1;
                break;
            }
        }
        return { degree, onset, octave };
    }
    protected fromOffset(offsetIn: number) {
        const { degree, onset, octave } = Interval.fromOffset(offsetIn);
        this.degree = degree;
        this.onset = onset;
        this.octave = octave;
        return this;
    }
    static fromRatio(ratioIn: number) {
        const offset = Math.round(Math.log(ratioIn) / Math.log(Frequency.SEMITONE));
        return new Interval(offset);
    }
    add(iIn: Interval) {
        const i = { degree: 0, onset: 0, octave: 0 };
        i.degree = floorMod(this.degree + iIn.degree - 1 - 1, 7) + 1;
        i.onset = this.offset - 12 * this.octave + iIn.offset - 12 * iIn.octave - Interval.getOffsetFromDegree(this.degree + iIn.degree - 1);
        i.octave = this.octave + iIn.octave + Math.floor((this.degree + iIn.degree - 1 - 1) / 7);
        this.degree = i.degree;
        this.onset = i.onset;
        this.octave = i.octave;
        return this;
    }
    static add(a: Interval, b: Interval) {
        return a.clone().add(b);
    }
    sub(iIn: Interval) {
        const i = { degree: 0, onset: 0, octave: 0 };
        i.degree = floorMod(this.degree - iIn.degree + 1 - 1, 7) + 1;
        i.onset = (this.offset - 12 * this.octave) - (iIn.offset - 12 * iIn.octave) - Interval.getOffsetFromDegree(this.degree - iIn.degree + 1);
        i.octave = this.octave - iIn.octave + Math.floor((this.degree - iIn.degree + 1 - 1) / 7);
        this.degree = i.degree;
        this.onset = i.onset;
        this.octave = i.octave;
        return this;
    }
    static sub(a: Interval, b: Interval) {
        return a.clone().sub(b);
    }
    equals(intervalIn: object) {
        return isInterval(intervalIn)
            && this.degree === intervalIn.degree
            && this.onset === intervalIn.onset
            && this.octave === intervalIn.octave;
    }
    compareTo(iIn: Interval) {
        return Interval.compare(this, iIn);
    }
    static compare(x: Interval, y: Interval) {
        return x.offset - y.offset;
    }
    reverse() {
        const i = { degree: 0, onset: 0, octave: 0 };
        i.degree = floorMod(1 - this.degree, 7) + 1;
        i.onset = 0 - (this.offset - 12 * this.octave) - Interval.getOffsetFromDegree(1 - this.degree + 1);
        i.octave = 0 - this.octave + Math.floor((1 - this.degree + 1 - 1) / 7);
        this.degree = i.degree;
        this.onset = i.onset;
        this.octave = i.octave;
        return this;
    }
    octaveReverse() {
        const i = { degree: 0, onset: 0, octave: 0 };
        i.degree = floorMod(1 - this.degree, 7) + 1;
        i.onset = 0 - (this.offset - 12 * this.octave) - Interval.getOffsetFromDegree(1 - this.degree + 1);
        i.octave = 1 - this.octave + Math.floor((1 - this.degree + 1 - 1) / 7);
        this.degree = i.degree;
        this.onset = i.onset;
        this.octave = i.octave;
        return this;
    }
    get offset() {
        return DEGREE_TO_OFFSET[floorMod(this.degree - 1, 7)] + 12 * Math.floor((this.degree - 1) / 7) + this.onset + 12 * this.octave;
    }
    get ratio() {
        return Frequency.getRatio(this.offset);
    }
    get fraction() {
        return nearestFraction(this.ratio);
    }
    get reciprocal() {
        return nearestReciprocal(this.ratio);
    }
    get property() {
        return Interval.getPropertyFromOffset(this.onset, this.degree);
    }
    static fromArray(arrayIn: (string | IInterval)[]) {
        return arrayIn.map(e => new Interval(e as any));
    }
    toString() {
        const sOnset = this.property ? this.property.abb : (this.onset > 0 ? "+" : "") + this.onset.toString() + "_";
        const sOctave = this.octave > 0 ? ("+" + this.octave) : this.octave < 0 ? this.octave : "";
        return sOnset + this.degree + sOctave;
    }
    clone() {
        return new Interval(this);
    }
}

export default Interval;
