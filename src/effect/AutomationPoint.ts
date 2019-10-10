import { Duration, isDuration } from "../Duration";

export interface IAutomationPoint {
    value: number;
    offset: Duration; // absolute position
    exponent: number; // 0 for linear, 1 for quadratic
}
export const isAutomationPoint = (x: any): x is IAutomationPoint => {
    return x instanceof AutomationPoint
        || (typeof x.value === "number"
        && isDuration(x.offset)
        && typeof x.exponent === "number");
};
export const isAutomationPointArray = (x: any): x is AutomationPoint[] => {
    return Array.isArray(x)
        && x.every(e => e instanceof AutomationPoint);
};
export class AutomationPoint implements IAutomationPoint {
    value: number;
    offset: Duration;
    exponent: number;
    constructor(value: number, offset: Duration, exponent?: number);
    constructor(pointIn: IAutomationPoint);
    constructor(first: number | IAutomationPoint, offset?: Duration, exponent?: number) {
        if (typeof first === "number") {
            this.value = first;
            this.offset = offset.clone();
            this.exponent = exponent || 0;
        } else {
            this.value = first.value;
            this.offset = first.offset;
            this.exponent = first.exponent;
        }
        return this;
    }
    clone() {
        return new AutomationPoint(this);
    }
}
