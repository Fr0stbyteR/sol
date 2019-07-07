export interface IArticulation {
    velocity: number;
    length: number;
}
export const isArticulation = (x: any): x is IArticulation => {
    return x instanceof Articulation
        || (typeof x === "object"
        && typeof x.velocity === "number"
        && typeof x.length === "number");
};
export class EnumArticulation {
    static get STACCATISSIMO() { return new Articulation(1, 0.25); }
    static get STACCATO() { return new Articulation(1, 0.4); }
    static get MEZZO_STACCATO() { return new Articulation(1, 0.75); }
    static get LEGATO() { return new Articulation(1, 0.95); }
    static get TENUTO() { return new Articulation(1, 1); }
    static get SOSTENUTO() { return new Articulation(1, 1.2); }
    static get MARCATO() { return new Articulation(1.5, 1); }
    static get PIZZICATO() { return new Articulation(1, 1); }
    static get MUTED() { return new Articulation(1, 1); }
}
export class Articulation implements IArticulation {
    velocity: number;
    length: number;
    constructor(articulationIn: IArticulation);
    constructor(velocityIn: number, lengthIn: number);
    constructor(first: IArticulation | number, lengthIn?: number) {
        if (isArticulation(first)) {
            this.velocity = first.velocity;
            this.length = first.length;
        } else {
            this.velocity = first;
            this.length = lengthIn;
        }
        return this;
    }
    clone() {
        return new Articulation(this);
    }
}
