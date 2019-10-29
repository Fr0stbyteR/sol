export const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
export const lcm = (a: number, b: number): number => a * (b / gcd(a, b));
export const floorMod = (x: number, y: number) => {
    return ((x % y) + y) % y;
};
export const isStringArray = (x: any): x is string[] => {
    return Array.isArray(x)
        && x.every(e => typeof e === "string");
};
export const isNumberArray = (x: any): x is number[] => {
    return Array.isArray(x)
        && x.every(e => typeof e === "number");
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
 * @param {number} [approx=17 / 16] Approximation ratio (> 1)
 * @returns {[number, number]} fraction tuple
 */
export const nearestFraction = (v: number, approx: number = 17 / 16): [number, number] => {
    let lastJ = 1;
    for (let i = 1; ; i++) {
        for (let j = lastJ; ; j++) {
            const d = (j / i) / v;
            if (d > approx) break;
            if (d < approx && d > 1 / approx) return [i, j];
            lastJ = j;
        }
    }
};
