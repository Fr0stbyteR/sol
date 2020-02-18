interface IComputable<T> {
    add(x: T): T;
    sub(x: T): T;
    mul?(x: number): T;
    div?(x: T): number;
    div?(x: number): T;
    equals(x: object): boolean;
    compareTo(x: T): number;
}
interface IClonable<T> {
    become(...args: any[]): T;
    clone(): T;
}
