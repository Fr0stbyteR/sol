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
    constructor(first: IForm | Part[] | Part, ...rest: Part[]) {
        if (isForm(first)) {
            this.parts = first.parts.slice();
        } else if (isPartArray(first)) {
            this.parts = first.slice();
        } else {
            this.parts = [first, ...rest];
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
