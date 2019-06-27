import { Interval, isIntervalArray } from "./Interval";
import { isStringArray, floorMod } from "./Utils";
import { Enum } from "./Enum";

type TEnumScaleName = "MAJOR" | "MINOR" | "PENTA" | "IONIAN" | "DORIAN" | "PHRYGIAN" | "LYDIAN" | "MIXOLYDIAN" | "AEOLIAN" | "LOCRIAN" | "ASCENDING_MELODIC_MINOR" | "PHRYGIAN_MAJ6" | "LYDIAN_AUG" | "LYDIAN_DOM" | "MIXOLYDIAN_MIN6" | "LOCRIAN_MAJ2" | "SUPER_LOCRIAN";
export class EnumScale extends Enum {
    protected static index = ["MAJOR", "MINOR", "PENTA", "IONIAN", "DORIAN", "PHRYGIAN", "LYDIAN", "MIXOLYDIAN", "AEOLIAN", "LOCRIAN", "ASCENDING_MELODIC_MINOR", "PHRYGIAN_MAJ6", "LYDIAN_AUG", "LYDIAN_DOM", "MIXOLYDIAN_MIN6", "LOCRIAN_MAJ2", "SUPER_LOCRIAN"] as TEnumScaleName[];
    static get MAJOR() { return new EnumScale("Major", "P1:Tonic", "M2:Supertonic", "M3:Mediant", "P4:Subdominant", "P5:Dominant", "M6:Submediant", "M7:Leading"); }
    static get MINOR() { return new EnumScale("Minor", "P1:Tonic", "M2:Supertonic", "m3:Mediant", "P4:Subdominant", "P5:Dominant", "m6:Submediant", "m7:Subtonic"); }
    static get PENTA() { return new EnumScale("Penta", "P1:Gong", "M2:Shang", "M3:Jiao", "P5:Zhi", "M6:Yu"); }

    static get IONIAN() { return EnumScale.MAJOR; }
    static get DORIAN() { return new EnumScale("Dorian", "P1:Tonic", "M2:Supertonic", "m3:Mediant", "P4:Subdominant", "P5:Dominant", "M6:Submediant", "m7:Subtonic"); }
    static get PHRYGIAN() { return new EnumScale("Phrygian", "P1:Tonic", "m2:Supertonic", "m3:Mediant", "P4:Subdominant", "P5:Dominant", "m6:Submediant", "m7:Subtonic"); }
    static get LYDIAN() { return new EnumScale("Lydian", "P1:Tonic", "M2:Supertonic", "M3:Mediant", "A4:Subdominant", "P5:Dominant", "M6:Submediant", "M7:Leading"); }
    static get MIXOLYDIAN() { return new EnumScale("Mixolydian", "P1:Tonic", "M2:Supertonic", "M3:Mediant", "P4:Subdominant", "P5:Dominant", "M6:Submediant", "m7:Subtonic"); }
    static get AEOLIAN() { return EnumScale.MINOR; }
    static get LOCRIAN() { return new EnumScale("Locrian", "P1:Tonic", "m2:Supertonic", "m3:Mediant", "P4:Subdominant", "d5:Dominant", "m6:Submediant", "m7:Subtonic"); }

    static get ASCENDING_MELODIC_MINOR() { return new EnumScale("Ascending Melodic Minor", "P1:Tonic", "M2:Supertonic", "m3:Mediant", "P4:Subdominant", "P5:Dominant", "M6:Submediant", "M7:Leading"); }
    static get PHRYGIAN_MAJ6() { return new EnumScale("Phrygian M6", "P1:Tonic", "m2:Supertonic", "m3:Mediant", "P4:Subdominant", "P5:Dominant", "M6:Submediant", "m7:Subtonic"); }
    static get LYDIAN_AUG() { return new EnumScale("Lydian Augmented", "P1:Tonic", "M2:Supertonic", "M3:Mediant", "A4:Subdominant", "A5:Dominant", "M6:Submediant", "M7:Leading"); }
    static get LYDIAN_DOM() { return new EnumScale("Lydian Dominant", "P1:Tonic", "M2:Supertonic", "M3:Mediant", "A4:Subdominant", "P5:Dominant", "M6:Submediant", "m7:Subtonic"); }
    static get MIXOLYDIAN_MIN6() { return new EnumScale("Mixolydian m6", "P1:Tonic", "M2:Supertonic", "M3:Mediant", "P4:Subdominant", "P5:Dominant", "m6:Submediant", "m7:Subtonic"); }
    static get LOCRIAN_MAJ2() { return new EnumScale("Locrian M2", "P1:Tonic", "M2:Supertonic", "m3:Mediant", "P4:Subdominant", "d5:Dominant", "m6:Submediant", "m7:Subtonic"); }
    static get SUPER_LOCRIAN() { return new EnumScale("Super Locrian", "P1:Tonic", "m2:Supertonic", "m3:Mediant", "d4:Subdominant", "d5:Dominant", "m6:Submediant", "m7:Subtonic"); }

    _name: string;
    scale: Scale;
    private constructor(nameIn: string, ...intervalsIn: string[]) {
        super();
        this._name = nameIn;
        this.scale = new Scale(intervalsIn);
        return this;
    }
    static byName(nameIn: TEnumScaleName) {
        return EnumScale[nameIn];
    }
    name() {
        return this._name;
    }
}
export interface IScale {
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
    intervals: Interval[];
    degreeNames: string[];

    constructor(degreesIn: string[]);
    constructor(scaleIn: IScale);
    constructor(first: string[] | IScale) {
        if (isScale(first)) {
            this.intervals = [...first.intervals];
            this.degreeNames = [...first.degreeNames];
        } else {
            this.intervals = [];
            this.degreeNames = [];
            for (let i = 0; i < first.length; i++) {
                const degreeName = first[i];
                const split = degreeName.split(":");
                if (split.length === 2) {
                    this.intervals[i] = new Interval(split[0]);
                    this.degreeNames[i] = split[1];
                } else {
                    this.intervals[i] = new Interval(degreeName);
                    this.degreeNames[i] = degreeName;
                }
            }
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
    equals(scaleIn: object) {
        return isScale(scaleIn)
            && this.intervals.length === scaleIn.intervals.length
            && this.intervals.every((interval, i) => interval.equals(scaleIn.intervals[i]))
            && this.degreeNames.length === scaleIn.degreeNames.length
            && this.degreeNames.every((name, i) => name === scaleIn.degreeNames[i]);
    }
    toString() {
        let s = "Scale :{";
        for (let i = 0; i < this.intervals.length; i++) {
            const sI = this.intervals[i].toString();
            const sN = this.degreeNames[i];
            s += sI + (sN.length > 0 && sN !== sI ? ":" + sN : "");
            if (i !== this.intervals.length - 1) s += ", ";
        }
        s += "}";
        return s;
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
