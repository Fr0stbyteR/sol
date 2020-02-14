/* eslint-disable @typescript-eslint/interface-name-prefix */
interface Computable<T> {
    add(x: T): T;
    sub(x: T): T;
    mul?(x: number): T;
    div?(x: T): number;
    div?(x: number): T;
    mod?(x: T): T;
    equals(x: object): boolean;
    compareTo(x: T): number;
}
