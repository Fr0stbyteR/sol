import { TimeCode } from "./TimeCode";
import { gcd, precisionFactor } from "./utils1";
import Random from "./genre/Random";

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
export class Duration implements IDuration, IComputable<Duration> {
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
        return this.check();
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
        return this.check();
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
        return this.check();
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
            return this.check();
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

    private check() {
        /*
        if (this.isAbsolute) {
            if (this.numerator < 0 || this.denominator <= 0) throw new Error("Duration should have positive value.");
        } else {
            if (this.seconds < 0) throw new Error("Duration should have positive value.");
        }
        */
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
