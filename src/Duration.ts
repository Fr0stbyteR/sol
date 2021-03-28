import { TimeCode } from "./TimeCode";
import { gcd, precisionFactor } from "./utils";
import Random from "./genre/Random";

export type TDurationAbbreviation = `${1 | 2 | 4 | 8 | 16 | 32 | 64 | 128}${"n" | "nd" | "nt"}`;
export const isDurationAbbreviation = (x: any): x is TDurationAbbreviation => {
    return typeof x === "string"
        && !!x.match(/^\d+n(t|d)?$/)
        && new Array(8).fill(null).map((v, i) => 2 ** i).indexOf(parseInt(x)) !== -1;
};
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
export class Duration implements IDuration, IComputable<Duration>, IClonable<Duration> {
    static readonly isDuration = isDuration;
    static readonly isDuractionAbbreviation = isDurationAbbreviation;
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
    constructor(durationIn: Duration);
    constructor(durationString: TDurationAbbreviation);
    constructor(first: number | Duration | TDurationAbbreviation, second?: number) {
        this.become(first, second);
    }
    become(first: number | Duration | TDurationAbbreviation, second?: number) {
        if (isDurationAbbreviation(first)) {
            this.isAbsolute = false;
            this.denominator = parseInt(first);
            if (first.endsWith("d")) {
                this.numerator = 3;
                this.denominator *= 2;
            } else if (first.endsWith("t")) {
                this.numerator = 2;
                this.denominator *= 3;
            } else {
                this.numerator = 1;
            }
            this.simplify();
        } else if (isDuration(first)) {
            this.isAbsolute = first.isAbsolute;
            this.numerator = first.numerator;
            this.denominator = first.denominator;
            this.seconds = first.seconds;
            this.simplify();
        } else if (typeof second === "number") {
            this.isAbsolute = false;
            this.numerator = first;
            this.denominator = second;
            this.simplify();
        } else {
            this.isAbsolute = true;
            this.seconds = first;
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
    getTicks(first: Parameters<this["getBeats"]>[0]) {
        return Math.round(this.getBeats(first) * 480);
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
    div(first: number | Duration) {
        if (typeof first === "number") {
            if (this.isAbsolute) {
                this.seconds /= first;
            } else {
                this.denominator *= first;
                this.simplify();
            }
            return this;
        }
        if (this.isAbsolute === first.isAbsolute) return this.value / first.value;
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
        const f = Math.max(precisionFactor(this.numerator), precisionFactor(this.denominator));
        const $gcd = gcd(this.numerator * f, this.denominator * f) / f;
        if ($gcd !== 1) {
            this.denominator /= $gcd;
            this.numerator /= $gcd;
        }
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
