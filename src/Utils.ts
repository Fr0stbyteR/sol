export const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
export const lcm = (a: number, b: number): number => a * (b / gcd(a, b));
export const floorMod = (x: number, y: number) => {
    return ((x % y) + y) % y;
};
export const isStringArray = (x: any): x is string[] => {
    return Array.isArray(x)
        && x.every(e => typeof e === "string");
};
