import { Segment } from "../../track/Segment";
import { Random } from "../Random";
import { IGeneratorParameters } from "../generator/Generator";

export abstract class Modifier {
    use: (randomIn: Random, segmentIn: Segment, modParamsIn?: any, genParamsIn?: IGeneratorParameters) => Segment;
}
