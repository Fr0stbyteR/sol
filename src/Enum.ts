export class Enum {
    protected static indexes: string[] = [];
    static values<T>(): T[] {
        return this.indexes.map(key => (this as unknown as { [key: string]: T })[key]);
    }
    static valueOf<T>(key: string): T {
        return (this as unknown as { [key: string]: T })[key];
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
