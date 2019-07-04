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
export const isChordProgressionGenre = (x: any): x is IChordProgressionGenre => {
    return x instanceof ChordProgressionGenre
        || (typeof x === "object"
        && (typeof x.III === "undefined" || typeof x.III === "boolean")
        && (typeof x.bVI === "undefined" || typeof x.bVI === "boolean")
        && (typeof x.bVII === "undefined" || typeof x.bVII === "boolean")
        && (typeof x.I7 === "undefined" || typeof x.I7 === "boolean")
        && (typeof x.II7 === "undefined" || typeof x.II7 === "boolean")
        && (typeof x.VI === "undefined" || typeof x.VI === "boolean")
        && (typeof x.i === "undefined" || typeof x.i === "boolean"));
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
        this.II = !!genre.II;
        this.III = !!genre.III;
        this.bVI = !!genre.bVI;
        this.bVII = !!genre.bVII;
        this.I7 = !!genre.I7;
        this.II7 = !!genre.II7;
        this.VI = !!genre.VI;
        this.i = !!genre.i;
        return this;
    }
    clone() {
        return new ChordProgressionGenre(this);
    }
}
