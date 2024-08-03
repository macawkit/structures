import Structure from './structure';
import Point from './point';
import Size from './size';

export default class Rect implements Structure<Rect> {
    constructor (
        public topLeft: Point,
        public size: Size
    ) {}

    public get valid (): boolean {
        return this.size.valid;
    }
    public get x (): number {
        return this.topLeft.x;
    }
    public get x1 (): number {
        return this.x;
    }
    public get x2 (): number {
        return this.x + this.width;
    }
    public get y (): number {
        return this.topLeft.y;
    }
    public get y1 (): number {
        return this.y;
    }
    public get y2 (): number {
        return this.y + this.height;
    }

    public get width (): number {
        return this.size.width;
    }
    public get height (): number {
        return this.size.height;
    }

    //todo: not sure about these guys, they will depend on coordinate system
    public get top (): number {
        return this.topLeft.y;
    }
    public get left (): number {
        return this.topLeft.x;
    }
    public get bottom (): number {
        return this.topLeft.y + this.size.height;
    }
    public get right (): number {
        return this.topLeft.x + this.size.width;
    }

    public copy (): Rect {
        return new Rect(this.topLeft.copy(), this.size.copy());
    }
    public equals (other: Rect, epsilon?: number): boolean {
        return (
            this.topLeft.equals(other.topLeft, epsilon) &&
            this.size.equals(other.size, epsilon)
        );
    }

    public add (other: Rect): void {
        this.topLeft.add(other.topLeft);
        this.size.add(other.size);
    }
    public sub (other: Rect): void {
        this.topLeft.sub(other.topLeft);
        this.size.sub(other.size);
    }
    public plus (other: Rect): Rect {
        return new Rect(
            this.topLeft.plus(other.topLeft),
            this.size.plus(other.size)
        );
    }
    public minus (other: Rect): Rect {
        return new Rect(
            this.topLeft.minus(other.topLeft),
            this.size.minus(other.size)
        );
    }

    public static fromArray ([x, y, width, height]: number[]): Rect {
        return new Rect(
            new Point(x, y),
            new Size(width, height)
        );
    }
    public static fromNumbers (x: number, y: number, width: number, height: number): Rect {
        return new Rect(
            new Point(x, y),
            new Size(width, height)
        );
    }
}
