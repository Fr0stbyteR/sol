// https://github.com/openmusic-project/openmusic/code/projects/basicproject/functions/series.lisp
export const x2dx = (array: number[]) => {
    const [, ...rest] = array;
    return rest.map((v2, i) => v2 - array[i]);
};
export const dx2x = (array: number[], start = 0) => {
    let acc = start;
    const ret = array.map(v => (acc += v));
    return [start, ...ret];
};
export const arithSer = (begin = 0, end = 10, step = 1, nummax = Number.MAX_SAFE_INTEGER) => {
    const array: number[] = [];
    for (let n = begin; step >= 0 ? n <= end : n >= end; n += step) {
        array.push(n);
        if (array.length >= nummax) return array;
    }
    return array;
};
export const fiboSer = (seed1 = 0, seed2 = 1, limit = 10) => {
    const array: number[] = [];
    if (seed1 < limit) array.push(seed1);
    if (seed2 < limit) array.push(seed2);
    let acc1 = seed2;
    let acc2 = seed1 + seed2;
    while (acc2 < limit) {
        array.push(acc2);
        [acc1, acc2] = [acc2, acc2 + acc1];
    }
    return array;
};
export const geometricSer = (seed = 1, factor = 2, limit = 10, nummax = Number.MAX_SAFE_INTEGER) => {
    const array: number[] = [];
    if (factor < 1) return array;
    for (let n = seed; n < limit; n *= factor) {
        array.push(n);
        if (array.length >= nummax) return array;
    }
    return array;
};
export const isPrime = (num: number) => {
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
};
export const primeSer = (max = 100, nummax = Number.MAX_SAFE_INTEGER) => {
    const array: number[] = [];
    for (let n = 2; n < max; n++) {
        if (isPrime(n)) array.push(n);
        if (array.length >= nummax) return array;
    }
    return array;
};
export const inharmSer = (begin = 1, dist = 1, npart = 1) => {
    const array: number[] = [];
    for (let i = 1; i <= npart; i++) {
        array.push(begin * i ** dist);
    }
    return array;
};
const Series = {
    x2dx,
    dx2x,
    arithSer,
    fiboSer,
    geometricSer,
    isPrime,
    primeSer,
    inharmSer
};
export default Series;
