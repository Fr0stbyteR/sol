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
    static readonly isArticulation = isArticulation;
    static readonly EnumArticulation = EnumArticulation;

    velocity: number;
    length: number;
    constructor(articulationIn: IArticulation);
    constructor(velocityIn: number, lengthIn: number);
    constructor(p1: IArticulation | number, lengthIn?: number) {
        if (isArticulation(p1)) {
            this.velocity = p1.velocity;
            this.length = p1.length;
        } else {
            this.velocity = p1;
            this.length = lengthIn;
        }
    }
    clone() {
        return new Articulation(this);
    }
    toString() {
        return `Art: [Vel: ${this.velocity} Len: ${this.length}]`;
    }
}

export default Articulation;
