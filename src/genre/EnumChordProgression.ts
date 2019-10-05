import { ChordProgression } from "./ChordProgression";

export class EnumChordProgression {
    static PERFECT = new ChordProgression("IV V I");
    static REV_ANDAL = new ChordProgression("bVI bVII I");
    static CANON = new ChordProgression("I V vi iii IV I");
    static POP1 = new ChordProgression("IV V iii vi");
    static POP2 = new ChordProgression("I vi IV V");
    static POP3 = new ChordProgression("I V vi IV");
    static EPIC1 = new ChordProgression("vi IV I V");
    static EPIC2 = new ChordProgression("vi I V ii");
    static EDM1 = new ChordProgression("IV I vi V");
    static EDM2 = new ChordProgression("IV V vi I");
    static TRAP1 = new ChordProgression("vi I IV III");
}
