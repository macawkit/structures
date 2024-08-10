interface Structure<T> {
    copy (): T;

    get valid (): boolean;
    equals (other: T, epsilon?: number): boolean;
    reset (): void;
}

export default Structure;

export interface OneDimensional<T> extends Structure<T> {
    add (other: T): T;
    sub (other: T): T;
    min (other: T): T;
    max (other: T): T;

    plus (other: T): T;
    minus (other: T): T;
    minimal (other: T): T;
    maximal (other: T): T;
}