import Duration, { IDuration, isDuration } from "../Duration";
import { isObjectArray } from "../utils";

export interface IAutomationPoint {
    value: number;
    /** Point Position */
    offset: IDuration;
    /** 0 for linear, 1 for quadratic */
    exponent: number;
}
export const isAutomationPoint = (x: any): x is IAutomationPoint => {
    return x instanceof AutomationPoint
        || (typeof x.value === "number"
        && isDuration(x.offset)
        && typeof x.exponent === "number");
};
export const isAutomationPointArray = (x: any): x is IAutomationPoint[] => {
    return isObjectArray(x, isAutomationPoint);
};
export class AutomationPoint implements IAutomationPoint, IClonable<AutomationPoint> {
    static readonly isAutomationPoint = isAutomationPoint;
    static readonly isAutomationPointArray = isAutomationPointArray;

    static fromArray(arrayIn: IAutomationPoint[]) {
        return arrayIn.map(e => new AutomationPoint(e));
    }

    value: number;
    offset: Duration;
    exponent: number;
    constructor(value: number, offset: Duration, exponent?: number);
    constructor(pointIn: IAutomationPoint);
    constructor(p1: number | IAutomationPoint, offset?: Duration, exponent?: number) {
        this.become(p1, offset, exponent);
    }
    become(p1: number | IAutomationPoint, offset?: Duration, exponent?: number) {
        if (typeof p1 === "number") {
            this.value = p1;
            this.offset = offset.clone();
            this.exponent = exponent || 0;
        } else {
            this.value = p1.value;
            this.offset = new Duration(p1.offset);
            this.exponent = p1.exponent;
        }
        return this;
    }
    clone() {
        return new AutomationPoint(this);
    }
}

export default AutomationPoint;
