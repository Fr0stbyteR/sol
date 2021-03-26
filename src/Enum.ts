export class Enum {
    protected static indexes: string[] = [];
    static values<T extends Enum>(): T[] {
        return this.indexes.map(key => (this as unknown as Record<string, T>)[key]);
    }
    static valueOf<T extends Enum>(key: string): T {
        return (this as unknown as Record<string, T>)[key];
    }
    protected constructor() {
    }
    name(): string {
        throw new Error("Method not implemented");
    }
    ordinal(): number {
        return (this.constructor as typeof Enum).indexes.indexOf(this.name());
    }
    toString(): string {
        return this.name();
    }
}

export default Enum;
