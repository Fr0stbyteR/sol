import { Segment } from "../../track/Segment";
import { IGeneratorParams } from "../generator/Generator";

/**
 * Describe a processor that modifies a segment, return itself modified.
 *
 * @export
 * @abstract
 * @class Modifier
 */
export abstract class Modifier {
    static use: (segmentIn: Segment, modParamsIn?: any, genParamsIn?: Partial<IGeneratorParams>) => Segment;
}
