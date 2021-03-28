import Note from "./Note";

export interface IImaginaryNote {
    note: Note;
    weight: number;
}
export type IImaginaryChord = IImaginaryNote[];
