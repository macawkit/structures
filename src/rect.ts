import Structure from './structure';
import Point from './point';
import Size from './size';

export default class Rect implements Structure<Rect> {
    constructor (
        public point: Point,
        public size: Size
    ) {}

    public get valid (): boolean {
        return this.size.valid;
    }

    public get x (): number {return this.point.x;}
    public set x (x: number) {
        this.point.x = x;
    }

    public get x1 (): number {return this.point.x;}
    public set x1 (x: number) {
        const diff = x - this.point.x;
        this.point.x = x;
        this.size.width -= diff;
    }

    public get x2 (): number {return this.point.x + this.size.width;}
    public set x2 (x: number) {
        const diff = x - this.point.x + this.size.width;
        this.size.width += diff;
    }

    public get y (): number {return this.point.y;}
    public set y (y: number) {
        this.point.y = y;
    }

    public get y1 (): number {return this.point.y;}
    public set y1 (y: number) {
        const diff = y - this.point.y;
        this.point.y = y;
        this.size.height -= diff;
    }

    public get y2 (): number {return this.point.y + this.size.height;}
    public set y2 (y: number) {
        const diff = y - this.point.y + this.size.height;
        this.size.height += diff;
    }

    public get width (): number {return this.size.width;}
    public set width (width: number) {
        this.size.width = width;
    }

    public get height (): number {return this.size.height;}
    public set height (height: number) {
        this.size.height = height;
    }

    //todo: not sure about these guys, they will depend on coordinate system
    public get top (): number {
        return this.point.y;
    }
    public get left (): number {
        return this.point.x;
    }
    public get bottom (): number {
        return this.point.y + this.size.height;
    }
    public get right (): number {
        return this.point.x + this.size.width;
    }

    public copy (): Rect {
        return new Rect(this.point.copy(), this.size.copy());
    }
    public equals (other: Rect, epsilon?: number): boolean {
        return (
            this.point.equals(other.point, epsilon) &&
            this.size.equals(other.size, epsilon)
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
