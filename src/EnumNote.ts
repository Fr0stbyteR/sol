import { floorMod } from "./utils";
import { TIntervalOffset, DEGREE_TO_OFFSET } from "./Interval";
import Enum from "./Enum";

export interface IEnumNote {
    className: "EnumNote";
    offset: TIntervalOffset;
}
export const isEnumNote = (x: any): x is IEnumNote => {
    return x instanceof EnumNote
        || (typeof x === "object"
        && x !== null
        && x.className === "EnumNote"
        && DEGREE_TO_OFFSET.indexOf(x.offset) !== -1);
};
export type TEnumNoteValue = "C" | "D" | "E" | "F" | "G" | "A" | "B";
export class EnumNote extends Enum {
    protected static indexes: TEnumNoteValue[] = ["C", "D", "E", "F", "G", "A", "B"];
    private static offsetMap: Record<string, TEnumNoteValue> = { 0: "C", 2: "D", 4: "E", 5: "F", 7: "G", 9: "A", 11: "B" };
    static get C() { return new EnumNote(0); }
    static get D() { return new EnumNote(2); }
    static get E() { return new EnumNote(4); }
    static get F() { return new EnumNote(5); }
    static get G() { return new EnumNote(7); }
    static get A() { return new EnumNote(9); }
    static get B() { return new EnumNote(11); }
    static c = EnumNote.C;
    static d = EnumNote.D;
    static e = EnumNote.E;
    static f = EnumNote.F;
    static g = EnumNote.G;
    static a = EnumNote.A;
    static b = EnumNote.B;
    readonly offset: TIntervalOffset;
    private constructor(offsetIn: TIntervalOffset) {
        super();
        this.offset = offsetIn;
    }
    static from(that: IEnumNote) {
        return this.byOffset(that.offset);
    }
    static byOffset(offsetIn: number) {
        if (typeof offsetIn !== "number") return null;
        const name = EnumNote.offsetMap[floorMod(offsetIn, 12)];
        if (name) return EnumNote[name];
        throw new SyntaxError(`No such note with offset ${offsetIn}.`);
    }
    static byIndex(indexIn: number) {
        if (typeof indexIn !== "number") return null;
        const name = EnumNote.indexes[floorMod(indexIn, 7)];
        if (name) return EnumNote[name];
        throw new SyntaxError(`No such note with index ${indexIn}.`);
    }
    get className() {
        return "EnumNote" as const;
    }
    name() {
        return EnumNote.offsetMap[this.offset];
    }
    get index() {
        return DEGREE_TO_OFFSET.indexOf(this.offset);
    }
    ordinal() {
        return this.index;
    }
    equals(noteIn: object) {
        return noteIn instanceof EnumNote && noteIn.offset === this.offset;
    }
}

export default EnumNote;
