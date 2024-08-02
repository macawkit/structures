interface Structure<T> {
    copy (): T;
    add (other: T): void;
    sub (other: T): void;

    plus (other: T): T;
    minus (other: T): T;
}

export default Structure;