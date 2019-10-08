import { Interval, isIntervalArray } from "./Interval";
import { isStringArray, floorMod } from "./Utils";

export class EnumScale {
    static get MAJOR() { return new Scale("Major", "P1:Tonic", "M2:Supertonic", "M3:Mediant", "P4:Subdominant", "P5:Dominant", "M6:Submediant", "M7:Leading"); }
    static get MINOR() { return new Scale("Minor", "P1:Tonic", "M2:Supertonic", "m3:Mediant", "P4:Subdominant", "P5:Dominant", "m6:Submediant", "m7:Subtonic"); }
    static get PENTA() { return new Scale("Penta", "P1:Gong", "M2:Shang", "M3:Jiao", "P5:Zhi", "M6:Yu"); }

    static get IONIAN() { return EnumScale.MAJOR; }
    static get DORIAN() { return new Scale("Dorian", "P1:Tonic", "M2:Supertonic", "m3:Mediant", "P4:Subdominant", "P5:Dominant", "M6:Submediant", "m7:Subtonic"); }
    static get PHRYGIAN() { return new Scale("Phrygian", "P1:Tonic", "m2:Supertonic", "m3:Mediant", "P4:Subdominant", "P5:Dominant", "m6:Submediant", "m7:Subtonic"); }
    static get LYDIAN() { return new Scale("Lydian", "P1:Tonic", "M2:Supertonic", "M3:Mediant", "A4:Subdominant", "P5:Dominant", "M6:Submediant", "M7:Leading"); }
    static get MIXOLYDIAN() { return new Scale("Mixolydian", "P1:Tonic", "M2:Supertonic", "M3:Mediant", "P4:Subdominant", "P5:Dominant", "M6:Submediant", "m7:Subtonic"); }
    static get AEOLIAN() { return EnumScale.MINOR; }
    static get LOCRIAN() { return new Scale("Locrian", "P1:Tonic", "m2:Supertonic", "m3:Mediant", "P4:Subdominant", "d5:Dominant", "m6:Submediant", "m7:Subtonic"); }

    static get ASCENDING_MELODIC_MINOR() { return new Scale("Ascending Melodic Minor", "P1:Tonic", "M2:Supertonic", "m3:Mediant", "P4:Subdominant", "P5:Dominant", "M6:Submediant", "M7:Leading"); }
    static get PHRYGIAN_MAJ6() { return new Scale("Phrygian M6", "P1:Tonic", "m2:Supertonic", "m3:Mediant", "P4:Subdominant", "P5:Dominant", "M6:Submediant", "m7:Subtonic"); }
    static get LYDIAN_AUG() { return new Scale("Lydian Augmented", "P1:Tonic", "M2:Supertonic", "M3:Mediant", "A4:Subdominant", "A5:Dominant", "M6:Submediant", "M7:Leading"); }
    static get LYDIAN_DOM() { return new Scale("Lydian Dominant", "P1:Tonic", "M2:Supertonic", "M3:Mediant", "A4:Subdominant", "P5:Dominant", "M6:Submediant", "m7:Subtonic"); }
    static get MIXOLYDIAN_MIN6() { return new Scale("Mixolydian m6", "P1:Tonic", "M2:Supertonic", "M3:Mediant", "P4:Subdominant", "P5:Dominant", "m6:Submediant", "m7:Subtonic"); }
    static get LOCRIAN_MAJ2() { return new Scale("Locrian M2", "P1:Tonic", "M2:Supertonic", "m3:Mediant", "P4:Subdominant", "d5:Dominant", "m6:Submediant", "m7:Subtonic"); }
    static get SUPER_LOCRIAN() { return new Scale("Super Locrian", "P1:Tonic", "m2:Supertonic", "m3:Mediant", "d4:Subdominant", "d5:Dominant", "m6:Submediant", "m7:Subtonic"); }
}
export interface IScale {
    scaleName?: string;
    intervals: Interval[];
    degreeNames: string[];
}
export const isScale = (x: any): x is IScale => {
    return x instanceof Scale
        || (typeof x === "object"
        && isStringArray(x.degreeNames)
        && isIntervalArray(x.intervals));
};
export class Scale implements Iterable<Interval>, IScale {
    scaleName?: string;
    intervals: Interval[];
    degreeNames: string[];

    constructor(nameIn: string, ...degreesIn: string[]);
    constructor(scaleIn: IScale);
    constructor(first: string | IScale, ...degreesIn: string[]) {
        if (typeof first === "string") {
            this.scaleName = first;
            this.intervals = [];
            this.degreeNames = [];
            for (let i = 0; i < degreesIn.length; i++) {
                const degreeName = degreesIn[i];
                const split = degreeName.split(":");
                if (split.length === 2) {
                    this.intervals[i] = new Interval(split[0]);
                    this.degreeNames[i] = split[1];
                } else {
                    this.intervals[i] = new Interval(degreeName);
                    this.degreeNames[i] = degreeName;
                }
            }
        } else {
            this.scaleName = first.scaleName;
            this.intervals = first.intervals.map(i => i.clone());
            this.degreeNames = [...first.degreeNames];
        }
        return this;
    }
    get size() {
        return this.intervals.length;
    }
    addNote(noteIn: string) {
        let interval: Interval;
        let name: string;
        const split = noteIn.split(":");
        if (split.length === 2) {
            interval = new Interval(split[0]);
            name = split[1];
        } else {
            interval = new Interval(noteIn);
            name = noteIn;
        }
        this.intervals.push(interval);
        this.degreeNames.push(name);
        return this;
    }
    getIntervalFromIndex(index: number) {
        return this.intervals[index];
    }
    getIntervalFromDegree(degreeIn: number) {
        return this.intervals.find((interval) => {
            return floorMod(degreeIn - 1, this.intervals.length) + 1 === interval.degree;
        });
    }
    get degrees() {
        return this.intervals.map(i => i.degree);
    }
    equals(scaleIn: object) {
        return isScale(scaleIn)
            && this.intervals.length === scaleIn.intervals.length
            && this.intervals.every((interval, i) => interval.equals(scaleIn.intervals[i]))
            && this.degreeNames.length === scaleIn.degreeNames.length
            && this.degreeNames.every((name, i) => name === scaleIn.degreeNames[i]);
    }
    public getName() {
        return this.scaleName;
    }
    toString() {
        let s = this.scaleName ? `Scale "${this.scaleName}": {` : "Scale :{";
        for (let i = 0; i < this.intervals.length; i++) {
            const sI = this.intervals[i].toString();
            const sN = this.degreeNames[i];
            s += sI + (sN.length > 0 && sN !== sI ? ":" + sN : "");
            if (i !== this.intervals.length - 1) s += ", ";
        }
        s += "}";
        return s;
    }
    clone() {
        return new Scale(this);
    }
    [Symbol.iterator](): Iterator<Interval> {
        const o = this;
        let i = -1;
        return {
            next() {
                let value: Interval;
                let done = true;
                if (i < o.intervals.length) {
                    value = o.intervals[i];
                    i++;
                    done = false;
                }
                return { value, done };
            }
        };
    }
}
