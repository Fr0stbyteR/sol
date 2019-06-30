export interface IVolume {
    volume: number;
}
export const isArticulation = (x: any): x is IVolume => {
    return x instanceof Volume
        && (typeof x === "object"
        && typeof x.volume === "number");
};
export class EnumVolume {
    static get SILENT() { return new Volume(0); }
    static get PPP() { return new Volume(10); }
    static get PP() { return new Volume(25); }
    static get PIANISSIMO() { return new Volume(25); }
    static get P() { return new Volume(50); }
    static get MP() { return new Volume(60); }
    static get MEZZO_PIANO() { return new Volume(60); }
    static get MF() { return new Volume(70); }
    static get MEZZO_FORTE() { return new Volume(70); }
    static get F() { return new Volume(85); }
    static get FORTE() { return new Volume(85); }
    static get FF() { return new Volume(100); }
    static get FORTISSIMO() { return new Volume(100); }
    static get FFF() { return new Volume(120); }
}
export class Volume {
    volume: number;
    constructor(volumeIn: number) {
        this.volume = volumeIn;
    }
}
