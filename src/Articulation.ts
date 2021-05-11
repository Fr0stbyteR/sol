export interface IArticulation {
    name?: string;
    velocity: number;
    length: number;
}
export const isArticulation = (x: any): x is IArticulation => {
    return x instanceof Articulation
        || (typeof x === "object"
        && x !== null
        && (typeof x.name === "undefined" || typeof x.name === "string")
        && typeof x.velocity === "number"
        && typeof x.length === "number");
};
export class EnumArticulation {
    static get STACCATISSIMO() { return new Articulation("staccatissimo", 1, 0.25); }
    static get STACCATO() { return new Articulation("staccato", 1, 0.4); }
    static get MEZZO_STACCATO() { return new Articulation("mezzo staccato", 1, 0.75); }
    static get LEGATO() { return new Articulation("legato", 1, 0.95); }
    static get TENUTO() { return new Articulation("tenuto", 1, 1); }
    static get SOSTENUTO() { return new Articulation("sostenuto", 1, 1.2); }
    static get ACCENT() { return new Articulation("accent", 1.2, 1); }
    static get MARCATO() { return new Articulation("marcato", 1.5, 1); }
    static get PIZZICATO() { return new Articulation("pizzicato", 1, 1); }
    static get MUTED() { return new Articulation("muted", 1, 1); }
}
export class Articulation implements IArticulation, IClonable<Articulation> {
    static readonly isArticulation = isArticulation;
    static readonly EnumArticulation = EnumArticulation;

    name?: string;
    velocity: number;
    length: number;
    constructor(articulationIn: IArticulation);
    constructor(name?: string, velocityIn?: number, lengthIn?: number);
    constructor(p1?: IArticulation | string, velocityIn = 1, lengthIn = 1) {
        this.become(p1, velocityIn, lengthIn);
    }
    become(p1?: IArticulation | string, velocityIn = 1, lengthIn = 1) {
        if (isArticulation(p1)) {
            this.name = p1.name;
            this.velocity = p1.velocity;
            this.length = p1.length;
        } else {
            this.name = p1;
            this.velocity = velocityIn;
            this.length = lengthIn;
        }
        return this;
    }

    clone() {
        return new Articulation(this);
    }
    toString() {
        return `Art: ${this.name} [Vel: ${this.velocity} Len: ${this.length}]`;
    }
}

export default Articulation;
