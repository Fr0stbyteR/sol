export const Utils = {
    floorMod: (x: number, y: number) => {
        return ((x % y) + y) % y;
    }
};
