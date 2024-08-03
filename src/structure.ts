interface Structure<T> {
    copy (): T;

    get valid(): boolean;
    equals (other: T, epsilon?: number): boolean;

    add (other: T): void;
    sub (other: T): void;

    plus (other: T): T;
    minus (other: T): T;
}

export default Structure;