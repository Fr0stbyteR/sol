import { Duration, isDuration } from "../../Duration";

export type Form = IPart[];
export interface IPart {
    minDuration: Duration;
    maxDuration: Duration;
    stepDuration: Duration;
}
export const isPart = (x: any): x is IPart => {
    return x instanceof Part
        || (isDuration(x.minDuration)
        || isDuration(x.maxDuration)
        || isDuration(x.stepDuration));
};
export class Part implements IPart {
    minDuration: Duration;
    maxDuration: Duration;
    stepDuration: Duration;
    constructor(minDuration: Duration, maxDuration?: Duration, stepDuration?: Duration);
    constructor(minMeasures: number, maxMeasures?: number, stepMeasures?: number);
    constructor(partIn: IPart);
    constructor(first: Duration | number | IPart, maxDuration?: Duration | number, stepDuration?: Duration | number) {
        if (isPart(first)) {
            this.minDuration = first.minDuration.clone();
            this.maxDuration = first.maxDuration.clone();
            this.stepDuration = first.stepDuration.clone();
        } else {
            this.minDuration = typeof first === "number" ? new Duration(first, 1) : first.clone();
            this.maxDuration = typeof maxDuration === "undefined"
                ? this.minDuration.clone()
                : typeof maxDuration === "number"
                    ? new Duration(maxDuration, 1)
                    : maxDuration.clone();
            this.stepDuration = typeof stepDuration === "undefined"
                ? new Duration(1, 1)
                : typeof stepDuration === "number"
                    ? new Duration(stepDuration, 1)
                    : stepDuration.clone();
        }
        return this;
    }
    clone() {
        return new Part(this);
    }
}