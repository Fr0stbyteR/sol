export const Utils = {
};
export const floorMod = (x: number, y: number) => {
    return ((x % y) + y) % y;
}
export const isStringArray = (x: any): x is string[] => {
    return Array.isArray(x)
        && x.every(e => typeof e === "string");
};
