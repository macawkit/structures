interface Structure<T> {
    copy (): T;

    get valid(): boolean;
    equals (other: T, epsilon?: number): boolean;
}

export default Structure;

export interface OneDimensional<T> extends Structure<T> {
    add (other: T): void;
    sub (other: T): void;

    plus (other: T): T;
    minus (other: T): T;
}