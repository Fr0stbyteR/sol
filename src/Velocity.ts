export interface IVelocity {
    velocity: number;
}
export const isVelocity = (x: any): x is IVelocity => {
    return x instanceof Velocity
        || (typeof x === "object"
        && typeof x.velocity === "number");
};
export class EnumVelocity {
    static get SILENT() { return new Velocity(0); }
    static get PPP() { return new Velocity(10); }
    static get PP() { return new Velocity(25); }
    static get PIANISSIMO() { return new Velocity(25); }
    static get P() { return new Velocity(50); }
    static get MP() { return new Velocity(60); }
    static get MEZZO_PIANO() { return new Velocity(60); }
    static get MF() { return new Velocity(70); }
    static get MEZZO_FORTE() { return new Velocity(70); }
    static get F() { return new Velocity(85); }
    static get FORTE() { return new Velocity(85); }
    static get FF() { return new Velocity(100); }
    static get FORTISSIMO() { return new Velocity(100); }
    static get FFF() { return new Velocity(120); }
}
export class Velocity implements IVelocity {
    velocity: number;

    constructor(velocityIn: number);
    constructor(velocityIn: IVelocity);
    constructor(velocityIn: number | IVelocity) {
        if (typeof velocityIn === "number") this.velocity = velocityIn;
        else this.velocity = velocityIn.velocity;
    }
    normalize() {
        return this.velocity / 128;
    }
    clone() {
        return new Velocity(this);
    }
}

export default Velocity;
