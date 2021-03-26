export const isEnumInstrumentTagArray = (x: any): x is EnumInstrumentTag[] => {
    return Array.isArray(x)
        && x.every(e => typeof e === "number");
};
export enum EnumInstrumentTag {
    LEAD,
    PAD,
    KICK,
    SNARE,
    TOM,
    HAT,
    RIDE,
    CYMBAL,
    VOCAL,
    SFX,
    BASS,
    STRING,
    BRASS,
    WOODWIND,
    SYNTH,
    GUITAR,
    KEYBOARD,
    ORGAN,
    DRUM,
    UNPITCHED,
    ACOUSTIC,
    ELECTRONIC,
    PITCHED,
    HAS_RANGE,
    PERCUSSION,
    VOICE
}
export const {
    LEAD,
    PAD,
    KICK,
    SNARE,
    TOM,
    HAT,
    RIDE,
    CYMBAL,
    VOCAL,
    SFX,
    BASS,
    STRING,
    BRASS,
    WOODWIND,
    SYNTH,
    GUITAR,
    KEYBOARD,
    ORGAN,
    DRUM,
    UNPITCHED,
    ACOUSTIC,
    ELECTRONIC,
    PITCHED,
    HAS_RANGE,
    PERCUSSION,
    VOICE
} = EnumInstrumentTag;

export default EnumInstrumentTag;
