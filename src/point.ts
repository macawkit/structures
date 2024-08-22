import { Coordinate } from './structure';

export default class Point implements Coordinate<Point>{
    constructor (
        public x: number,
        public y: number
    ) {}

    public get valid (): boolean {
        return this.x === this.x &&
            this.y === this.y;
    }
    public copy (): Point {
        return new Point(this.x, this.y);
    }

    public assign (other: Point): this {
        this.x = other.x;
        this.y = other.y;

        return this;
    }

    public equals (other: Point, epsilon?: number): boolean {
        if (epsilon) {
            return (
                Math.abs(this.x - other.x) < epsilon &&
                Math.abs(this.y - other.y) < epsilon
            );
        }

        return this.x === other.x && this.y === other.y;
    }
    public reset (): void {
        this.x = 0;
        this.y = 0;
    }
    public toString (): string {
        return `Point(${this.x.toString()}, ${this.y.toString()})`;
    }

    public add (other: Point): this {
        this.x += other.x;
        this.y += other.y;

        return this;
    }
    public sub (other: Point): this {
        this.x -= other.x;
        this.y -= other.y;

        return this;
    }
    public min (other: Point): this {
        this.x = Math.min(this.x, other.x);
        this.y = Math.min(this.y, other.y);

        return this;
    }
    public max (other: Point): this {
        this.x = Math.max(this.x, other.x);
        this.y = Math.max(this.y, other.y);

        return this;
    }
    public set (x: number, y: number): this {
        this.x = x;
        this.y = y;

        return this;
    }
    public move (x: number, y: number): this {
        this.x += x;
        this.y += y;

        return this;
    }

    public plus (other: Point): Point {
        return new Point(this.x + other.x, this.y + other.y);
    }
    public minus (other: Point): Point {
        return new Point(this.x - other.x, this.y - other.y);
    }
    public minimal (other: Point): Point {
        return new Point(
            Math.min(this.x, other.x),
            Math.min(this.y, other.y)
        );
    }
    public maximal (other: Point): Point {
        return new Point(
            Math.max(this.x, other.x),
            Math.max(this.y, other.y)
        );
    }

    public quadrant (reference: Point): Quadrant {
        const xDiff = this.x - reference.x;
        const yDiff = this.y - reference.y;
        if (xDiff > 0) {
            if (yDiff > 0)
                return Quadrant.first;
            else if (yDiff < 0)
                return Quadrant.forth;
            else
                return Quadrant.forthFirst;
        } else if (xDiff < 0) {
            if (yDiff > 0)
                return Quadrant.second;
            else if (yDiff < 0)
                return Quadrant.third;
            else
                return Quadrant.secondThird;
        } else {
            if (yDiff > 0)
                return Quadrant.firstSecond;
            else if (yDiff < 0)
                return Quadrant.thirdForth;
            else
                return Quadrant.all;
        }
    }

    public static max (x1: number, y1: number, x2: number, y2: number): Point {
        return new Point(Math.max(x1, x2), Math.max(y1, y2));
    }
    public static min (x1: number, y1: number, x2: number, y2: number): Point {
        return new Point(Math.min(x1, x2), Math.min(y1, y2));
    }
}

export enum Quadrant {
    first           = 0b0001,
    second          = 0b0010,
    third           = 0b0100,
    forth           = 0b1000,
    firstSecond     = 0b0011,
    secondThird     = 0b0110,
    thirdForth      = 0b1100,
    forthFirst      = 0b1001,
    all             = 0b1111
}