export interface IChordProgressionGenre {
    II?: boolean;
    III?: boolean;
    bVI?: boolean;
    bVII?: boolean;
    I7?: boolean;
    II7?: boolean;
    VI?: boolean;
    i?: boolean;
}
const keys: (keyof IChordProgressionGenre)[] = [
    "II",
    "III",
    "bVI",
    "bVII",
    "I7",
    "II7",
    "VI",
    "i"
];
export const isChordProgressionGenre = (x: any): x is IChordProgressionGenre => {
    return x instanceof ChordProgressionGenre
        || (typeof x === "object"
        && keys.every(k => typeof x[k] === "undefined" || typeof x[k] === "boolean"));
};
export class ChordProgressionGenre implements IChordProgressionGenre {
    II?: boolean;
    III?: boolean;
    bVI?: boolean;
    bVII?: boolean;
    I7?: boolean;
    II7?: boolean;
    VI?: boolean;
    i?: boolean;
    constructor(genreIn?: IChordProgressionGenre) {
        const genre = genreIn || {};
        keys.forEach(k => this[k] = !!genre[k]);
    }
    and(genreIn: IChordProgressionGenre) {
        keys.forEach(k => this[k] = this[k] && genreIn[k]);
    }
    or(genreIn: IChordProgressionGenre) {
        keys.forEach(k => this[k] = this[k] || genreIn[k]);
    }
    clone() {
        return new ChordProgressionGenre(this);
    }
}

export default ChordProgressionGenre;
