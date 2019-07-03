import { TimeCode } from "./TimeCode";
import { gcd } from "./Utils";

export interface IDuration {
    isAbsolute: boolean;
    numerator: number;
    denominator: number;
    seconds: number;
}
export const isDuration = (x: any): x is IDuration => {
    return x instanceof Duration
        || (typeof x.isAbsolute === "boolean"
        && x.isAbsolute
            ? typeof x.seconds === "number"
            : typeof x.numerator === "number" && typeof x.denominator === "number"
        );
};
export class Duration implements IDuration {
    isAbsolute: boolean; // Absolute duration is represented by seconds.
    numerator: number; // Quarter note = 1/4, Whole note = 1/1, Quarter note triplet = 1/6
    denominator: number;
    seconds: number; // Absolute duration if in abs mode.

    constructor(secondsIn: number);
    constructor(numeratorIn: number, denominatorIn: number);
    constructor(durationIn: Duration);
    constructor(first: number | Duration, second?: number) {
        if (isDuration(first)) {
            this.isAbsolute = first.isAbsolute;
            this.numerator = first.numerator;
            this.denominator = first.denominator;
            this.seconds = first.seconds;
            this.simplify().check();
        } else if (typeof second === "number") {
            this.isAbsolute = false;
            this.numerator = first;
            this.denominator = second;
            this.simplify().check();
        } else {
            this.isAbsolute = true;
            this.seconds = first;
            this.check();
        }
        return this;
    }
    private get value() {
        return this.isAbsolute ? this.seconds : this.numerator / this.denominator;
    }

    getBeats(): number;
    getBeats(timeCodeIn: TimeCode): number;
    getBeats(bpmIn: number): number;
    getBeats(first?: TimeCode | number) {
        if (typeof first === "undefined") {
            if (this.isAbsolute) throw new Error("Absolute duration needs BPM to calculate.");
            return this.value * 4;
        }
        if (typeof first === "number") { // bpmIn
            return this.value * 4 * first / 60;
        } // timeCodeIn
        return this.value * 4 * first.getAbsoluteDuration();
    }

    toAbsolute(bpmIn: number): this;
    toAbsolute(timeCodeIn: TimeCode): this
    toAbsolute(first: TimeCode | number) {
        if (this.isAbsolute) return this;
        if (typeof first === "number") this.seconds = this.getBeats() * first / 60;
        else this.seconds = first.getAbsoluteDuration(this.getBeats());
        this.isAbsolute = true;
        return this;
    }

    add(durationIn: Duration) {
        if (this.denominator === durationIn.denominator) this.numerator += durationIn.numerator;
        else {
            this.numerator = this.numerator * durationIn.denominator + durationIn.numerator * this.denominator;
            this.denominator *= durationIn.denominator;
        }
        this.simplify().check();
        return this;
    }

    sub(durationIn: Duration) {
        if (this.denominator === durationIn.denominator) this.numerator -= durationIn.numerator;
        else {
            this.numerator = this.numerator * durationIn.denominator - durationIn.numerator * this.denominator;
            this.denominator *= durationIn.denominator;
        }
        this.simplify().check();
        return this;
    }

    mul(f: number) {
        this.numerator *= f;
        this.simplify().check();
        return this;
    }

    div(f: number) {
        this.numerator /= f;
        this.simplify().check();
        return this;
    }

    private simplify() {
        const _gcd = gcd(this.numerator, this.denominator);
        if (_gcd > 1) {
            this.denominator /= _gcd;
            this.numerator /= _gcd;
        }
        return this;
    }

    private check() {
        if (this.isAbsolute) {
            if (this.numerator <= 0 || this.denominator <= 0) throw new Error("Duration should have positive value.");
        } else {
            if (this.seconds <= 0) throw new Error("Duration should have positive value.");
        }
        return this;
    }

    clone() {
        return new Duration(this);
    }

    compareTo(that: IDuration) {
        return Duration.compare(this, that);
    }

    static compare(x: IDuration, y: IDuration) {
        if (x.isAbsolute !== y.isAbsolute) throw new Error("Cannot compare between absolute and relative duration");
        return x.isAbsolute ? x.seconds - y.seconds : x.numerator / x.denominator - y.numerator / y.denominator;
    }

    equals(durationIn: object) {
        return isDuration(durationIn) && this.compareTo(durationIn) === 0;
    }

    toString() {
        return this.isAbsolute ? this.seconds + "s" : this.getBeats() + " beats";
    }
}
