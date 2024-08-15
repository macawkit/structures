interface Structure<T> {
    copy (): T;
    // assign (other: T): T;

    get valid (): boolean;
    equals (other: T, epsilon?: number): boolean;
    reset (): void;
}

export default Structure;

export interface Operable<T> extends Structure<T> {
    add (other: T): T;
    sub (other: T): T;

    plus (other: T): T;
    minus (other: T): T;
}

export interface Coordinate<T> extends Operable<T> {
    min (other: T): T;
    max (other: T): T;

    minimal (other: T): T;
    maximal (other: T): T;
}