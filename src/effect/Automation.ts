import AutomationPoint, { isAutomationPointArray } from "./AutomationPoint";

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
    }
    clone() {
        return new Automation(this);
    }
}

export default Automation;
