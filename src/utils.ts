import Frequency from "./Frequency";
import Random from "./genre/Random";

export const precisionFactor = (x: number, e = 1): number => (Math.round(x * e) !== x * e ? precisionFactor(x, e * 10) : e);
export const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
export const lcm = (a: number, b: number): number => a * (b / gcd(a, b));
export const floorMod = (x: number, y: number) => ((x % y) + y) % y;
export const isStringArray = (x: any): x is string[] => {
    return Array.isArray(x)
        && x.every(e => typeof e === "string");
};
export const isNumberArray = (x: any): x is number[] => {
    return Array.isArray(x)
        && x.every(e => typeof e === "number");
};

export const isObjectArray = <T>(x: any, typeGuard: (e: any) => e is T): x is T[] => {
    return Array.isArray(x)
        && x.every(typeGuard);
};

export const isObjectInstanceArray = <T>(x: any, Type: new (...args: any[]) => T): x is T[] => {
    return Array.isArray(x)
        && x.every(e => e instanceof Type);
};

export const isObjectArrayLike = <T>(x: any, typeGuard: (e: any) => e is T): x is ArrayLike<T> => {
    if (x === null || typeof x !== "object" || typeof x.length !== "number") return false;
    for (let i = 0; i < x.length; i++) {
        if (typeGuard(x[i])) continue;
        else return false;
    }
    return true;
};

export const isObjectInstanceArrayLike = <T>(x: any, Type: new (...args: any[]) => T): x is ArrayLike<T> => {
    if (x === null || typeof x !== "object" || typeof x.length !== "number") return false;
    for (let i = 0; i < x.length; i++) {
        if (x[i] instanceof Type) continue;
        else return false;
    }
    return true;
};

export const isObjectIterable = <T>(x: any, typeGuard: (e: any) => e is T): x is Iterable<T> => {
    if (typeof x !== "object" || x === null) return false;
    if (typeof x[Symbol.iterator] !== "function") return false;
    return Array.from(x).every(typeGuard);
};

export const isObjectInstanceIterable = <T>(x: any, Type: new (...args: any[]) => T): x is Iterable<T> => {
    if (typeof x !== "object" || x === null) return false;
    if (typeof x[Symbol.iterator] !== "function") return false;
    return Array.from(x).every(e => e instanceof Type);
};

export const parseRoman = (stringIn: string) => {
    if (stringIn.length === 0) return 0;
    let c: number;
    if (stringIn.match(/[IVXLCDM]+/)) c = 1;
    else if (stringIn.match(/[ivxlcdm]+/)) c = -1;
    else throw new Error("Roman number error.");
    const string = stringIn.toUpperCase();
    if (!string.match(/(M{0,3})(C{1,3}|C?D|DC{1,3}|CM)?(X{1,3}|X?L|LX{1,3}|XC)?(I{1,3}|I?V|VI{1,3}|IX)?$/)) {
        throw new Error("Roman number error.");
    }
    const r = ["I", "V", "X", "L", "C", "D", "M"];
    const a = [1, 5, 10, 50, 100, 500, 1000];
    const rIn = string.split("");
    const aOut: number[] = [];
    for (let i = 0; i < rIn.length; i++) {
        for (let j = 0; j < r.length; j++) {
            if (rIn[i] === r[j]) aOut[i] = a[j];
        }
    }
    let sum = aOut[0];
    for (let i = 0; i < rIn.length - 1; i++) {
        if (aOut[i] >= aOut[i + 1]) {
            sum += aOut[i + 1];
        } else {
            sum = sum + aOut[i + 1] - 2 * aOut[i];
        }
    }
    return sum * c;
};
export const toRoman = (nIn: number) => {
    let n = Math.round(Math.abs(nIn));
    if (n > 3999 || n === 0) throw new Error("Too large or Too small for Roman Number.");
    const a = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const r = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
    let rOut = "";
    for (let i = 0; i < a.length; i++) {
        while (n >= a[i]) {
            rOut += r[i];
            n -= a[i];
        }
    }
    return nIn > 0 ? rOut : rOut.toLowerCase();
};
export const getValueFromCurve = (t0: number, t1: number, t: number, exp: number) => t0 + (t1 - t0) * (t ** (2 ** exp));
/**
 * Get a fraction typle from a floating number.
 *
 * @param {number} v Floating number
 * @param {number} [approx=Frequency.THRES_AUDIT] Approximation ratio (> 1)
 * @returns {number[]} fraction tuple
 */
export const nearestFraction = (v: number, approxIn: number = Frequency.THRES_AUDIT): number[] => nearestFractions([1, v], approxIn);
export const nearestFractions = (ratio: number[], approxIn: number = Frequency.THRES_AUDIT): number[] => {
    if (ratio.length < 2) return ratio.map(() => 1);
    let approx = approxIn;
    let iApprox = 1 / approx;
    if (iApprox > approx) [iApprox, approx] = [approx, iApprox];
    let div = 0;
    let ref: number;
    const factor: number[] = [];
    const iFactor: number[] = [];
    const delta: number[] = [];
    do {
        ref = ratio[0] / ++div;
        factor[0] = div;
        iFactor[0] = div;
        delta[0] = 1;
        for (let i = 1; i < ratio.length; i++) {
            factor[i] = ratio[i] / ref;
            iFactor[i] = Math.round(factor[i]);
            delta[i] = iFactor[i] / factor[i];
        }
    } while (!delta.every(d => iApprox < d && d < approx));
    return iFactor;
};
export const nearestReciprocal = (ratio: number, approxIn: number = Frequency.THRES_AUDIT) => nearestReciprocals([ratio, 1], approxIn);
export const nearestReciprocals = (ratio: number[], approxIn: number = Frequency.THRES_AUDIT): number[] => {
    if (ratio.length < 2) return ratio.map(() => 1);
    let approx = approxIn;
    let iApprox = 1 / approx;
    if (iApprox > approx) [iApprox, approx] = [approx, iApprox];
    let mul = 0;
    let ref: number;
    const factor: number[] = [];
    const iFactor: number[] = [];
    const delta: number[] = [];
    do {
        ref = ratio[0] * ++mul;
        factor[0] = mul;
        iFactor[0] = mul;
        delta[0] = 1;
        for (let i = 1; i < ratio.length; i++) {
            factor[i] = ref / ratio[i];
            iFactor[i] = Math.round(factor[i]);
            delta[i] = iFactor[i] / factor[i];
        }
    } while (!delta.every(d => iApprox < d && d < approx));
    return iFactor;
};
export const permutations = <T = any>(array: T[]): T[][] => {
    const { length } = array;
    const result = [array.slice()];
    const c = new Array(length).fill(0);
    let i = 1;
    let k: number;
    let p: T;
    while (i < length) {
        if (c[i] < i) {
            k = i % 2 && c[i];
            const permutation = array.slice();
            p = permutation[i];
            permutation[i] = permutation[k];
            permutation[k] = p;
            c[i]++;
            i = 1;
            result.push(permutation);
        } else {
            c[i] = 0;
            i++;
        }
    }
    return result;
};
export const permute = <T = any>(array: T[], random?: Random): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = random ? random.randint(0, i + 1) : ~~(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};
export const combinations = <T = any>(array: T[]): T[][] => {
    const { length } = array;
    const helper = ($: number, current: T[], result: T[][]) => {
        for (let i = $; i < length; i++) {
            const next = current.slice().concat(array[i]);
            result.push(next);
            if ($ < length - 1) helper(i + 1, next, result);
        }
        return result;
    };
    return helper(0, [], []);
};
export const randomCombination = <T = any>(array: T[], random?: Random): T[] => {
    return array.filter(() => (random ? !!random.randint(0, 1) : Math.random() < 0.5));
};

const Utils = {
    precisionFactor,
    gcd,
    lcm,
    floorMod,
    isStringArray,
    isNumberArray,
    isObjectArray,
    isObjectInstanceArray,
    isObjectArrayLike,
    isObjectInstanceArrayLike,
    isObjectIterable,
    isObjectInstanceIterable,
    parseRoman,
    toRoman,
    getValueFromCurve,
    nearestFraction,
    nearestFractions,
    nearestReciprocal,
    nearestReciprocals,
    permutations,
    permute,
    combinations,
    randomCombination
};
export default Utils;
