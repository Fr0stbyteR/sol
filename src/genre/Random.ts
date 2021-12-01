import seedrandom from "seedrandom";

export class Random {
    private prng: ReturnType<seedrandom>;
    constructor(seedIn?: string) {
        this.prng = seedrandom(seedIn || "");
    }
    quick() {
        return this.prng.quick();
    }
    int32() {
        return this.prng.int32();
    }
    double() {
        return this.prng.double();
    }
    state() {
        return this.prng.state();
    }
    randint(minimum: number, maximum: number) {
        return Math.floor(this.quick() * (maximum - minimum + 1)) + minimum;
    }
}

export default Random;
