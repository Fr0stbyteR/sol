import Genre from "./Genre";
import Part from "./form/Part";
import { ChordProgressionGenre } from "./ChordProgressionGenre";
import { Form } from "./form/Form";

// https://djtrauma.wordpress.com/2012/07/17/dubstep-song-structure/
const parts = {
    prebeat: new Part(0, 8, 4),
    intro: new Part(8, 32, 8),
    bassdrop: new Part(0, 32, 8),
    breakdown: new Part(0, 32, 8),
    buildup: new Part(0, 8, 8),
    drop: new Part(16, 32, 16),
    bridge: new Part(0, 16, 8),
    outro: new Part(0, 16, 8)
};
const { prebeat, intro, bassdrop, breakdown, buildup, drop, bridge, outro } = parts;
export const EDM = new Genre({
    name: "EDM",
    getParts: () => parts,
    getChordProgression: () => null,
    chordProgressionGenre: new ChordProgressionGenre(),
    getForm: () => {
        return new Form(
            prebeat,
            intro,
            bassdrop,
            breakdown,
            buildup,
            drop,
            bridge,
            bassdrop,
            breakdown,
            buildup,
            drop,
            outro
        );
    }
});

export default EDM;
