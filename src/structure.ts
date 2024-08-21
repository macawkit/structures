interface Structure<T> {
    copy (): T;
    // assign (other: T): T;

    get valid (): boolean;
    equals (other: T, epsilon?: number): boolean;
    reset (): void;
    toString (): string;
}

export default Structure;

export interface Coordinate<T> extends Structure<T> {
    add (other: T): T;
    sub (other: T): T;

    min (other: T): T;
    max (other: T): T;

    plus (other: T): T;
    minus (other: T): T;

    minimal (other: T): T;
    maximal (other: T): T;
}