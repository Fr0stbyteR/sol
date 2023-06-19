import { TimeCode } from "./TimeCode";
import { gcd, nearestFractions, precisionFactor } from "./utils";
import Random from "./genre/Random";

export type TDurationAbbreviation = `${1 | 2 | 4 | 8 | 16 | 32 | 64 | 128}${"n" | "nd" | "nt"}` | "0";
export const isDurationAbbreviation = (x: any): x is TDurationAbbreviation => {
    return typeof x === "string"
        && (x === "0" || (
            !!x.match(/^\d+n(t|d)?$/)
            && new Array(8).fill(null).map((v, i) => 2 ** i).indexOf(parseInt(x)) !== -1
        ));
};
export interface IDuration {
    isAbsolute: boolean;
    numerator: number;
    denominator: number;
    seconds: number;
}
export const isDuration = (x: any): x is IDuration => {
    return x instanceof Duration
        || (typeof x === "object"
        && x !== null
        && typeof x.isAbsolute === "boolean"
        && (x.isAbsolute
            ? typeof x.seconds === "number"
            : typeof x.numerator === "number" && typeof x.denominator === "number"
        ));
};
export class Duration implements IDuration, IComputable<Duration>, IClonable<Duration> {
    static readonly isDuration = isDuration;
    static readonly isDuractionAbbreviation = isDurationAbbreviation;

    static fromArray(arrayIn: IDuration[]) {
        return arrayIn.map(e => new Duration(e));
    }

    /**
     * Absolute mode (use seconds or numerator/denominator)
     */
    isAbsolute: boolean;
    /**
     * Quarter note = 1/4, Whole note = 1/1, Quarter note triplet = 1/6
     */
    numerator: number;
    /**
     * Quarter note = 1/4, Whole note = 1/1, Quarter note triplet = 1/6
     */
    denominator: number;
    /**
     * Absolute duration if in abs mode, in seconds
     */
    seconds: number;

    constructor(secondsIn: number);
    constructor(numeratorIn: number, denominatorIn: number);
    constructor(durationIn: IDuration);
    constructor(durationString: TDurationAbbreviation);
    constructor(p1: number | IDuration | TDurationAbbreviation, p2?: number) {
        this.become(p1, p2);
    }
    become(p1: number | IDuration | TDurationAbbreviation, p2?: number) {
        if (isDurationAbbreviation(p1)) {
            this.isAbsolute = false;
            this.denominator = parseInt(p1);
            if (p1.endsWith("d")) {
                this.numerator = 3;
                this.denominator *= 2;
            } else if (p1.endsWith("t")) {
                this.numerator = 2;
                this.denominator *= 3;
            } else {
                this.numerator = 1;
            }
            this.simplify();
        } else if (isDuration(p1)) {
            this.isAbsolute = p1.isAbsolute;
            this.numerator = p1.numerator;
            this.denominator = p1.denominator;
            this.seconds = p1.seconds;
            this.simplify();
        } else if (typeof p2 === "number") {
            this.isAbsolute = false;
            this.numerator = p1;
            this.denominator = p2;
            this.simplify();
        } else {
            this.isAbsolute = true;
            this.seconds = p1;
        }
        return this;
    }
    private get value() {
        return this.isAbsolute ? this.seconds : this.numerator / this.denominator;
    }
    get isRelative() {
        return !this.isAbsolute;
    }

    getBeats(): number;
    getBeats(timeCodeIn: TimeCode): number;
    getBeats(bpmIn: number): number;
    getBeats(p1?: TimeCode | number) {
        if (!this.isAbsolute) return this.value * 4;
        if (typeof p1 === "undefined") throw new Error("Absolute duration needs BPM to calculate.");
        if (typeof p1 === "number") return this.value * 4 * p1 / 60; // bpmIn
        return this.value * 4 * p1.getSecondsFromBeats();
    }
    getTicks(p1?: Parameters<this["getBeats"]>[0]) {
        return Math.round(this.getBeats(p1) * 480);
    }

    toAbsolute(bpmIn: number): this;
    toAbsolute(timeCodeIn: TimeCode): this;
    toAbsolute(p1: TimeCode | number) {
        if (this.isAbsolute) return this;
        if (typeof p1 === "number") this.seconds = this.getBeats() * 60 / p1;
        else this.seconds = p1.getSecondsFromBeats(this.getBeats());
        this.isAbsolute = true;
        return this;
    }

    toRelative(bpmIn: number): this;
    toRelative(timeCodeIn: TimeCode): this;
    toRelative(p1: TimeCode | number) {
        if (!this.isAbsolute) return this;
        if (typeof p1 === "number") this.numerator = this.seconds * p1 / 60;
        else this.numerator = p1.getBeatsFromSeconds(this.seconds);
        this.denominator = 4;
        this.isAbsolute = false;
        this.simplify();
        return this;
    }

    add(durationIn: Duration) {
        if (this.isAbsolute && durationIn.isAbsolute) {
            this.seconds += durationIn.seconds;
        } else if (!this.isAbsolute && !durationIn.isAbsolute) {
            if (this.denominator === durationIn.denominator) {
                this.numerator += durationIn.numerator;
            } else {
                this.numerator = this.numerator * durationIn.denominator + durationIn.numerator * this.denominator;
                this.denominator *= durationIn.denominator;
            }
            this.simplify();
        } else {
            throw new Error("Cannot operate between absolute and relative duration.");
        }
        return this;
    }
    static add(a: Duration, b: Duration) {
        return a.clone().add(b);
    }
    sub(durationIn: Duration) {
        if (this.isAbsolute && durationIn.isAbsolute) {
            this.seconds -= durationIn.seconds;
        } else if (!this.isAbsolute && !durationIn.isAbsolute) {
            if (this.denominator === durationIn.denominator) {
                this.numerator -= durationIn.numerator;
            } else {
                this.numerator = this.numerator * durationIn.denominator - durationIn.numerator * this.denominator;
                this.denominator *= durationIn.denominator;
            }
            this.simplify();
        } else {
            throw new Error("Cannot operate between absolute and relative duration.");
        }
        return this;
    }
    static sub(a: Duration, b: Duration) {
        return a.clone().sub(b);
    }
    mul(f: number) {
        if (this.isAbsolute) {
            this.seconds *= f;
        } else {
            this.numerator *= f;
            this.simplify();
        }
        return this;
    }
    static mul(a: Duration, b: number) {
        return a.clone().mul(b);
    }
    div(f: number): this;
    div(durationIn: Duration): number;
    div(p1: number | Duration) {
        if (typeof p1 === "number") {
            if (this.isAbsolute) {
                this.seconds /= p1;
            } else {
                this.denominator *= p1;
                this.simplify();
            }
            return this;
        }
        if (this.isAbsolute === p1.isAbsolute) return this.value / p1.value;
        throw new Error("Cannot operate between absolute and relative duration.");
    }
    static div(a: Duration, b: number): Duration;
    static div(a: Duration, b: Duration): number;
    static div(a: Duration, b: Duration | number) {
        if (typeof b === "number") return a.clone().div(b);
        return a.clone().div(b);
    }
    equals(durationIn: object) {
        return isDuration(durationIn) && this.compareTo(durationIn) === 0;
    }
    compareTo(that: IDuration) {
        return Duration.compare(this, that);
    }
    static compare(x: IDuration, y: IDuration) {
        if (x.isAbsolute !== y.isAbsolute) throw new Error("Cannot compare between absolute and relative duration");
        return x.isAbsolute ? x.seconds - y.seconds : x.numerator / x.denominator - y.numerator / y.denominator;
    }

    private simplify() {
        if (this.numerator === 0) return this;
        if (Number.isInteger(this.numerator) && Number.isInteger(this.denominator)) return this;
        const f = Math.max(precisionFactor(this.numerator), precisionFactor(this.denominator));
        const $gcd = gcd(this.numerator * f, this.denominator * f) / f;
        if ($gcd !== 1) {
            this.denominator /= $gcd;
            this.numerator /= $gcd;
        }
        const [n, d] = nearestFractions([this.numerator, this.denominator], 1.001);
        this.numerator = n;
        this.denominator = d;
        return this;
    }

    clone() {
        return new Duration(this);
    }

    static random(randomIn: Random, min: Duration, max: Duration, step: Duration): Duration {
        if (min.equals(max)) return min.clone();
        const d = max.clone().sub(min);
        const steps = randomIn.randint(0, ~~d.div(step));
        return min.clone().add(step.clone().mul(steps));
    }

    toString() {
        return this.isAbsolute ? this.seconds + "s" : this.getBeats() + " beats";
    }
}

export default Duration;
