import { Segment } from "../../track/Segment";
import { Random } from "../Random";
import { IGeneratorConstraints } from "../generator/Generator";

export interface IModifierConstraints {
    densify?: number;
    transpose?: number;
    shift?: number;
    compress?: number;
    reflect?: number;
}
export abstract class Modifier {
    use: (randomIn: Random, segmentIn: Segment, modConstraintsIn?: IModifierConstraints, genConstraintsIn?: IGeneratorConstraints) => Segment;
}
