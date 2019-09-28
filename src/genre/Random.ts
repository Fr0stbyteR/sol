import * as seedrandom from "seedrandom";

export class Random {
    private prng: seedrandom.prng;
    constructor(seedIn: string) {
        this.prng = seedrandom(seedIn);
        return this;
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
}
