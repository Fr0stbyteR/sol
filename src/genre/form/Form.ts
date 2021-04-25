import Part, { isPartArray } from "./Part";

export interface IForm {
    parts: Part[];
}
export const isForm = (x: any): x is IForm => {
    return x instanceof Form
        || (typeof x === "object"
        && isPartArray(x.parts));
};
export class Form implements IForm, Iterable<Part> {
    static readonly isForm = isForm;

    parts: Part[];
    constructor(formIn: IForm);
    constructor(partsIn: Part[]);
    constructor(...partsIn: Part[]);
    constructor(p1: IForm | Part[] | Part, ...rest: Part[]) {
        if (isForm(p1)) {
            this.parts = p1.parts.slice();
        } else if (isPartArray(p1)) {
            this.parts = p1.slice();
        } else {
            this.parts = [p1, ...rest];
        }
    }
    clone() {
        return new Form(this);
    }
    * [Symbol.iterator](): Iterator<Part> {
        for (const part of this.parts) {
            yield part;
        }
    }
}

export default Form;
