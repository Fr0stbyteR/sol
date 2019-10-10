import { AutomationPoint, isAutomationPointArray } from "./AutomationPoint";
import { Duration } from "../Duration";
import { getValueFromCurve } from "../Utils";

export interface IAutomation {
    path: string;
    points: AutomationPoint[];
}
export const isAutomation = (x: any): x is IAutomation => {
    return x instanceof Automation
        || (typeof x.path === "string"
        && isAutomationPointArray(x.points));
};
export const isAutomationArray = (x: any): x is Automation[] => {
    return Array.isArray(x)
        && x.every(e => e instanceof Automation);
};
export class Automation implements IAutomation {
    path: string;
    points: AutomationPoint[];
    constructor(path: string, points?: AutomationPoint[]);
    constructor(automationIn: IAutomation);
    constructor(first: string | IAutomation, points?: AutomationPoint[]) {
        if (typeof first === "string") {
            this.path = first;
            this.points = points ? points.map(e => e.clone()) : [];
        } else {
            this.path = first.path;
            this.points = first.points.map(e => e.clone());
        }
        return this;
    }
    getValueAtTime(time: Duration) {
        this.sort();
        let prev: AutomationPoint;
        let next: AutomationPoint;
        for (let i = 0; i < this.points.length; i++) {
            const p = this.points[i];
            if (p.offset.compareTo(time) < 0) prev = p;
            if (p.offset.compareTo(time) > 0) {
                next = p;
                break;
            }
        }
        if (!prev) return next.value;
        if (!next) return prev.value;
        if (prev && next) {
            const duration = next.offset.clone().sub(prev.offset);
            const split = time.clone().sub(prev.offset);
            const ratio = split.div(duration);
            return getValueFromCurve(prev.value, next.value, ratio, prev.exponent);
        }
        throw Error(`No point in automation: ${this.path}`);
    }
    sort() {
        this.points = this.points.sort((a, b) => a.offset.compareTo(b.offset));
    }
    toString() {
        return `Automation: "${this.path}": {${this.points.map(p => `${p.value.toFixed(2)}@${p.offset.toString()}`).join()}}`;
    }
    clone() {
        return new Automation(this);
    }
}
