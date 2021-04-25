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
type PromisifiedFunction<F extends (...args: any[]) => any> = (...args: Parameters<F>) => ReturnType<F> extends Promise<any> ? ReturnType<F> : Promise<ReturnType<F>>;

type UnPromisifiedFunction<F extends (...args: any[]) => any> = (...args: Parameters<F>) => ReturnType<F> extends Promise<infer P> ? P : ReturnType<F>;

type FunctionMap = Record<string, (...args: any[]) => any>;

type PromisifiedFunctionMap<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? PromisifiedFunction<T[K]> : T[K];
};
type UnPromisifiedFunctionMap<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? UnPromisifiedFunction<T[K]> : T[K];
};
