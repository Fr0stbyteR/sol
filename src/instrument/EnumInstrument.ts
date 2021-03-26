import { BassDrum } from "./BassDrum";
import { TConcreteInstrument } from "./Instrument";
import { EnumInstrumentTag, ACOUSTIC, ELECTRONIC } from "./EnumInstrumentTag";

export class EnumInstrument {
    static map: { [key: string]: TConcreteInstrument } = {};
    static BASS_DRUM = BassDrum;
    static SUB_BASS_DRUM = EnumInstrument.getClass("Sub Bass Drum", BassDrum);
    static ACOUSTIC_BASS_DRUM = EnumInstrument.getClass("Acoustic Bass Drum", BassDrum, ACOUSTIC);
    static ELECTRONIC_BASS_DRUM = EnumInstrument.getClass("Electronic Bass Drum", BassDrum, ELECTRONIC);
    static SIDE_STICK = EnumInstrument.getClass("", null);
    static SNARE = EnumInstrument.getClass("", null);
    static ACOUSTIC_SNARE = EnumInstrument.getClass("", null);
    static ELECTRONIC_SNARE = EnumInstrument.getClass("", null);
    static HAND_CLAP = EnumInstrument.getClass("", null);
    static HI_HAT = EnumInstrument.getClass("", null);
    static CLOSED_HI_HAT = EnumInstrument.getClass("", null);
    static PEDAL_HI_HAT = EnumInstrument.getClass("", null);
    static OPEN_HI_HAT = EnumInstrument.getClass("", null);
    static FLOOR_TOM = EnumInstrument.getClass("", null);
    static LOW_FLOOR_TOM = EnumInstrument.getClass("", null);
    static HIGH_FLOOR_TOM = EnumInstrument.getClass("", null);
    static LEFT_TOM = EnumInstrument.getClass("", null);
    static RIGHT_TOM = EnumInstrument.getClass("", null);
    static TOM = EnumInstrument.getClass("", null);
    static LOW_TOM = EnumInstrument.getClass("", null);
    static LOW_MID_TOM = EnumInstrument.getClass("", null);
    static HI_MID_TOM = EnumInstrument.getClass("", null);
    static HIGH_TOM = EnumInstrument.getClass("", null);
    static CYMBAL = EnumInstrument.getClass("", null);
    static CRASH_CYMBAL = EnumInstrument.getClass("", null);
    static RIDE_CYMBAL = EnumInstrument.getClass("", null);
    static CHINESE_CYMBAL = EnumInstrument.getClass("", null);
    static SPLASH_CYMBAL = EnumInstrument.getClass("", null);
    static TAMBOURINE = EnumInstrument.getClass("", null);
    static HI_BELL = EnumInstrument.getClass("", null);
    static LO_BELL = EnumInstrument.getClass("", null);
    static RIDE_BELL = EnumInstrument.getClass("", null);
    static COWBELL = EnumInstrument.getClass("", null);
    static VIBRASLAP = EnumInstrument.getClass("", null);
    static HI_BONGO = EnumInstrument.getClass("", null);
    static LOW_BONGO = EnumInstrument.getClass("", null);
    static MUTE_HI_CONGA = EnumInstrument.getClass("", null);
    static OPEN_HI_CONGA = EnumInstrument.getClass("", null);
    static LOW_CONGA = EnumInstrument.getClass("", null);
    static HIGH_TIMBALE = EnumInstrument.getClass("", null);
    static LOW_TIMBALE = EnumInstrument.getClass("", null);
    static HIGH_AGOGO = EnumInstrument.getClass("", null);
    static LOW_AGOGO = EnumInstrument.getClass("", null);
    static CABASA = EnumInstrument.getClass("", null);
    static MARACAS = EnumInstrument.getClass("", null);
    static SHORT_WHISTLE = EnumInstrument.getClass("", null);
    static LONG_WHISTLE = EnumInstrument.getClass("", null);
    static SHORT_GUIRO = EnumInstrument.getClass("", null);
    static LONG_GUIRO = EnumInstrument.getClass("", null);
    static CLAVES = EnumInstrument.getClass("", null);
    static HI_WOOD_BLOCK = EnumInstrument.getClass("", null);
    static LOW_WOOD_BLOCK = EnumInstrument.getClass("", null);
    static MUTE_CUICA = EnumInstrument.getClass("", null);
    static OPEN_CUICA = EnumInstrument.getClass("", null);
    static MUTE_TRIANGLE = EnumInstrument.getClass("", null);
    static OPEN_TRIANGLE = EnumInstrument.getClass("", null);
    static getClass(nameIn: string, instrumentIn: TConcreteInstrument, ...tagsIn: EnumInstrumentTag[]): TConcreteInstrument {
        this.map[nameIn] = class extends instrumentIn {
            static NAME = nameIn;
            static TAGS = [...instrumentIn.TAGS, ...tagsIn || []];
        };
        return this.map[nameIn];
    }
    static byName(nameIn: string) {
        return this.map[nameIn];
    }
}

export default EnumInstrument;
